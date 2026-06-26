# TSWoW on Arch Linux — Session Handoff

**Date:** 2026-06-14
**Status:** ✅ Build works · ✅ DB works · ⚠️ Full server boot needs WoW 3.3.5a client · ⏳ Portable packaging not done

---

## TL;DR

TSWoW now builds and installs cleanly on Arch (gcc 16.1.1, cmake 4.3.3, boost 1.91, openssl 3.6, mariadb 12.3, node 26). All Arch-specific failures were patched (files listed below — patches live in working tree, **NOT committed**). Running `worldserver` directly succeeds (banner + boost/openssl/MariaDB connection works). The `node start.js server-mode` wrapper completes DB migrations + world.dest rebuild, then hangs waiting on client data (DBC/maps). This is expected without a WoW client.

---

## Toolchain (Arch verified)

- gcc/g++ 16.1.1 · cmake 4.3.3 · boost 1.91 (system) · openssl 3.6.3
- mariadb 12.3.2 (user `tswow@localhost` / password `password`)
- node 26.2.0 · npm 11.16.0 · p7zip 26.01
- Fish shell — no `$!`, use `$last_pid`

---

## Layout

- Source: `~/Documents/sources/tswow/`
- Build:  `~/Documents/sources/tswow-build/`
- Install:`~/Documents/sources/tswow-install/` (3.2 GB, working)
- Mods/launcher: `~/Documents/wowmods/start.sh` (auto-detects client, falls back to server-mode)
- TC binaries: `tswow-install/bin/trinitycore/RelWithDebInfo/{worldserver,authserver,...}`
- Realm config: `tswow-install/modules/default/realms/realm/{worldserver.conf,realm.conf}`

---

## Patches applied (all in `~/Documents/sources/tswow/`, uncommitted)

### Build system / toolchain
- `arch-compat/boost_compat/boost_system-1.91.0/` — **NEW** shim providing `Boost::system` INTERFACE target (boost 1.91 made boost_system header-only and removed cmake config).
- `tswow-scripts/compile/TrinityCore.ts` (Linux branch ~L256-296): `TSWOW_CC||/usr/bin/gcc`, `TSWOW_CXX||/usr/bin/g++`, `-DCMAKE_PREFIX_PATH=<arch-compat/boost_compat>`, `-DCMAKE_POLICY_VERSION_MINIMUM=3.5`, `-DWITH_WARNINGS=0`, `make -j $(nproc)`.
- `tswow-scripts/compile/MPQBuilder.ts` + `tswow-scripts/compile/BLPConverter.ts` Linux branches: same gcc + policy + parallel make.
- `misc/mpqbuilder/CMakeLists.txt` + `misc/blpconverter/CMakeLists.txt`: `set(CMAKE_POLICY_VERSION_MINIMUM 3.5 CACHE STRING "" FORCE)` after `cmake_minimum_required` (cmd-line `-D` does not propagate into FetchContent_Populate + add_subdirectory for legacy StormLib `cmake_minimum_required 2.8.12`).
- `misc/blpconverter/CMakeLists.txt`: also `target_compile_options(... -std=gnu11 -Wno-implicit-function-declaration -Wno-implicit-int -Wno-old-style-definition)` + `target_compile_definitions(... Z_HAVE_UNISTD_H=1 _LARGEFILE64_SOURCE=1)` (bundled zlib/libimagequant use K&R and pre-C99 idioms).

### TrinityCore source
- `cores/TrinityCore/CMakeLists.txt` ~L36: `target_include_directories(liblua PUBLIC ${LUA_ROOT})` — sol2 PCH must see fetched lua 5.4 not system 5.5.
- `~/Documents/sources/tswow-build/TrinityCore/_deps/lua-src/lua.hpp` — **NEW** extern-C wrapper so `<lua.hpp>` resolves to fetched 5.4.
- `cores/TrinityCore/dep/boost/CMakeLists.txt`: removed `-DBOOST_ASIO_NO_DEPRECATED` (deadline_timer.hpp is guarded by it).
- `cores/TrinityCore/dep/jemalloc/src/jemalloc_cpp.cpp` ~L70: `std::__throw_bad_alloc()` → `throw std::bad_alloc()` (gcc 16 removed helper).
- `cores/TrinityCore/dep/jemalloc/include/jemalloc/internal/safety_check.h`: `void(*)()` → `void(*)(const char*)`.
- `cores/TrinityCore/src/common/Utilities/StartProcess.cpp`: all `<boost/process/X.hpp>` → `<boost/process/v1/X.hpp>`, `boost::process` → `boost::process::v1` (boost 1.91 split).
- `tswow-core/Public/TSPlayer.h` ~L24: `#include "TSItemEntry.h"` — gcc 16 instantiates `vector<TSItemEntry>` dtor for default arg, forward decl no longer enough.

---

## Reproduce build (Arch)

```bash
sudo pacman -S --needed gcc cmake boost openssl mariadb mariadb-libs nodejs npm \
  p7zip git python clang ncurses zlib bzip2

# MariaDB (once)
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl enable --now mariadb
sudo mariadb -e "CREATE USER 'tswow'@'localhost' IDENTIFIED BY 'password'; \
  GRANT ALL ON *.* TO 'tswow'@'localhost' WITH GRANT OPTION; FLUSH PRIVILEGES;"

cd ~/Documents/sources/tswow
git submodule update --init --recursive
npm install
node build.js          # full pipeline — produces ~/Documents/sources/tswow-install/
```

---

## Run

```bash
cd ~/Documents/sources/tswow-install
node start.js                    # needs Wow.exe + client
node start.js server-mode        # skips client validation; hangs without data
# direct worldserver test (verifies build):
cd modules/default/realms/realm && \
  ../../../../bin/trinitycore/RelWithDebInfo/worldserver -c worldserver.conf
```

`~/Documents/wowmods/start.sh` is a wrapper that auto-finds an adjacent WoW 3.3.5a client.

---

## Verification status

| Component | State |
|---|---|
| TrinityCore compile + link | ✅ `--version` reports `c797f13b2c9f+ (Unix, RelWithDebInfo, Dynamic)` |
| mpqbuilder, blpconverter | ✅ built |
| Install pipeline | ✅ "Installation successful!" |
| Auth/characters/world.source migrations | ✅ 6+7+25 applied |
| world.dest rebuild | ✅ runs |
| worldserver binary runs standalone | ✅ banner + DB connect + boost/openssl OK |
| Full `node start.js server-mode` to port 8085 bound | ❌ hangs — needs DBC/map data from real client |
| Login with WoW 3.3.5a client | ⏳ untested (no client on hand) |

---

## NEXT SESSION — pick up here

### 1. End-to-end verification with a real client (priority 1)
- Place a WoW 3.3.5a client at `~/Documents/wowmods/<anything>/Wow.exe`.
- Run `~/Documents/wowmods/start.sh`. It will copy/patch `Default.Client` in `node.conf`, extract DBC/maps/vmaps/mmaps (long, one-time), then bring auth (3724) + world (8085) online.
- Verify ports: `ss -tlnp | grep -E ':3724|:8085'`.
- Create an account: in tswow prompt `account create <user> <pass>` then `account set gmlevel <user> 3 -1`.

### 2. Portable packaging (user's standing request)
**Blocker:** TC binaries have `RUNPATH=/home/blin/Documents/sources/tswow-build/TrinityCore/install/trinitycore/lib` baked in. Also link to Arch-specific `libboost_*.so.1.91.0`, `libssl.so.3`, `libmariadb.so.3`.

Three options (user has not yet chosen):

1. **Build script (most portable, smallest):** ship the repo + `setup-arch.sh` / `setup-debian.sh` that installs deps and runs `node build.js`. Reliable across distros.
2. **Same-distro Arch tarball:** `patchelf --set-rpath '$ORIGIN/../lib' bin/trinitycore/RelWithDebInfo/{worldserver,authserver,*.so,...}`, bundle required `.so`s, ship `tswow-arch-linux.tar.gz` (~500 MB-1 GB) with a `run.sh` setting `LD_LIBRARY_PATH`. Works only on current-ish Arch.
3. **AppImage:** bundle every dep, single executable. Highest portability, most work.

Recommended starting point: option 2 script:
```bash
cd ~/Documents/sources/tswow-install
find bin -type f \( -executable -o -name '*.so*' \) -exec file {} + \
  | grep ELF | cut -d: -f1 \
  | xargs -I{} patchelf --set-rpath '$ORIGIN:$ORIGIN/../lib' {}
ldd bin/trinitycore/RelWithDebInfo/worldserver  # collect non-glibc deps into ./lib/
tar czf ~/tswow-arch.tar.gz -C ~/Documents/sources tswow-install
```

### 3. Commit patches upstream-quality
All changes are in working tree of `~/Documents/sources/tswow/`. Group as logical commits:
- "Arch/gcc16 build fixes"
- "Boost 1.91 compatibility (process v1, system shim, asio deprecated)"
- "cmake 4 policy minimum"
- "lua 5.4 isolation from system 5.5"
- "blpconverter/mpqbuilder C compatibility"

---

## Key lessons / gotchas

- `cmd | tee log | tail -N` **hides** live output (tail flushes at EOF). Use `> log 2>&1 &` and poll separately.
- `node build.js` swallows cmake nonzero exit then `epoll_wait`s forever (8h hang observed). Always check `/tmp/*.log` and kill node if stuck.
- cmake `-DCMAKE_POLICY_VERSION_MINIMUM=3.5` does **not** propagate into FetchContent + add_subdirectory. Must edit the parent CMakeLists.txt with `set(... CACHE STRING "" FORCE)` before the fetch.
- tswow ports: 3724 (auth) · 8085 (world) · 7878 (internal)
- TC binary RUNPATH check: `readelf -d worldserver | grep -E 'RPATH|RUNPATH'`

---

## Files referenced

- `~/Documents/sources/tswow/` — repo with patches
- `~/Documents/sources/tswow-build/` — cmake build dir
- `~/Documents/sources/tswow-install/` — runnable install (3.2 GB)
- `~/Documents/wowmods/start.sh` — launcher (4.8k, executable)
- `/memories/build-tips.md` — general lessons (top-level memory only; repo/session scopes unavailable)
