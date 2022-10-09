import {
  BluetoothConnected,
  DeviceThermostat,
  NordicWalking,
} from '@suid/icons-material';
import Box from '@suid/material/Box';
import Divider from '@suid/material/Divider';
import List from '@suid/material/List';
import ListItem from '@suid/material/ListItem';
import ListItemButton from '@suid/material/ListItemButton';
import ListItemIcon from '@suid/material/ListItemIcon';
import ListItemText from '@suid/material/ListItemText';
import Skeleton from '@suid/material/Skeleton';
import Stack from '@suid/material/Stack';
import { Component, For } from 'solid-js';
import { theme } from '../App';
import { celiusToFahrenheit, stepsToKM } from '../constants';
import DeviceProvider from '../lib/device';
import { data } from '../lib/store';

const Home: Component = () => {
  return (
    <DeviceProvider>
      {!data?.temps && (
        <Stack spacing={1} sx={{ padding: 2 }}>
          <For each={[0, 0, 0]}>
            {() => (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ borderRadius: theme.shape.borderRadius }}
              />
            )}
          </For>
        </Stack>
      )}
      {data?.temps && (
        <Box
          sx={{
            width: '100%',
            padding: 2,
          }}
        >
          <List>
            {process.env.NODE_ENV === 'development' && (
              <ListItem>
                <ListItemText>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </ListItemText>
              </ListItem>
            )}
            <ListItem>
              <ListItemIcon>
                <BluetoothConnected />
              </ListItemIcon>
              <ListItemText>Connected</ListItemText>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NordicWalking />
                </ListItemIcon>
                <ListItemText>
                  <div>
                    <b>{data.steps}</b> {' steps'}
                  </div>
                  <div>
                    <b>{stepsToKM(data.steps)}</b> {'km'}
                  </div>
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DeviceThermostat />
                </ListItemIcon>
                <ListItemText>
                  <b>
                    {data.temps[data.temps.length - 1]}
                    <sup>℃</sup>
                  </b>
                  (
                  <b>
                    {celiusToFahrenheit(data.temps[data.temps.length - 1])}
                    <sup>℉</sup>
                  </b>
                  ){' current temperature'}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
    </DeviceProvider>
  );
};

export default Home;
