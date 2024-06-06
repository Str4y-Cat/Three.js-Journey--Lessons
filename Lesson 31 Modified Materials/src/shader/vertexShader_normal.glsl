#include <beginnormal_vertex>

float angle= uAngle*(position.y+ uTime);
mat2 rotMatrix=get2dRotateMatrix(angle);

objectNormal.xz= rotMatrix * objectNormal.xz;
