#include <begin_vertex>

float angle= 0.5*(transformed.y + uTime);
mat2 rotMatrix=get2dRotateMatrix(angle);
transformed.xz*=rotMatrix;

// transformed.xy=get2dRotateMatrix(angle);
