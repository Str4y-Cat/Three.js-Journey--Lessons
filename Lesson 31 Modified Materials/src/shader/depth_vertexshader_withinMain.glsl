

 #include <begin_vertex>

            float angle = (position.y + uTime) * uAngle;
            mat2 rotateMatrix = get2dRotateMatrix(angle);

            transformed.xz = rotateMatrix * transformed.xz;

// transformed.xy=get2dRotateMatrix(angle);
