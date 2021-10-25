export function datasetYaml(id: string) {
    return `# ${id} dataset configuration
# Whether this dataset should build and enable mmaps
use_mmaps: false

# The client directory to use for development with this dataset
# Can be used to override the setting in "node.yaml"
# client_path: c:\\path\\to\\my\\client

# What modules this dataset uses
modules:
  - all

# What client patches should be applied
# Lines starting with "!" are excluded if previously included
client_patches:
  - all
  - !client-extensions

# What extensions to ignore when building assets
ignore_assets:
  - .png
  - .blend
`
}

export function realmYaml(name: string) {
return `# TSWoW Realm Configuration

dataset: default
realm_name: ${name}
address: 127.0.0.1
local_address: 127.0.0.1
local_subnet_mask: 255.255.255.0
port: 8085
type: 0
flag: 0
security_level: 0
timezone: 1`
}