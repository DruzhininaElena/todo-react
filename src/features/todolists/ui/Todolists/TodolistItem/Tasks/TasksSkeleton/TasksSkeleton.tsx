import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"

export const TasksSkeleton = () => (
    <>
        {Array(4)
            .fill(null)
            .map((_, id) => (
                <Box key={id} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box style={{ gap: "15px", display: 'flex', alignItems: 'center' }}>
                        <Skeleton width={20} height={30} />
                        <Skeleton width={150} height={40} />
                    </Box>
                    <Skeleton width={16} height={30} />
                </Box>
            ))}
    </>
)