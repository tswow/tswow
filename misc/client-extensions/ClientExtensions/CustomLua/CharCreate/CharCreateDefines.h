#include "Util.h"

struct CharacterData {
    DWORD raceId;
    DWORD genderId;
    DWORD classId;
    DWORD hairColorId;
    DWORD skinId;
    DWORD faceId;
    DWORD facialHairId;
    DWORD hairStyleId;
};


struct CharacterComponent {
    DWORD gap0[6];
    CharacterData charData;
};
