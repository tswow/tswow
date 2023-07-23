#include "TSMath.h"

#include <random>

thread_local std::mt19937_64 gen(std::random_device{}());
thread_local std::uniform_real_distribution<double> dist(0,1.0);
TSNumber<double> MathClass::random() { return dist(gen); }