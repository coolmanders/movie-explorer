import React from "react";

import {
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from "@mui/material";

const LoadingSkeleton: React.FC = () => {
  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2, my: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Skeleton variant="text" width="60%" />
            <List>
              {Array.from(new Array(6)).map((_, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={<Skeleton variant="text" width="40%" />}
                    secondary={<Skeleton variant="text" width="60%" />}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoadingSkeleton;
