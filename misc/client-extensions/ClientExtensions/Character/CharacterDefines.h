#pragma once
#include "SharedDefines.h"

#include <iostream>

static uint32_t memoryTable[128] = { 0 };
static uint32_t raceNameTable[32] = { 0 };

uint32_t activeSpec = 0;
uint32_t masteryAmount = 0;
float masteryPct = 0;
float masteryRatingSpec1 = 0;
float masteryRatingSpec2 = 0;
float masteryRatingSpec3 = 0;
float masteryRatingSpec4 = 0;
