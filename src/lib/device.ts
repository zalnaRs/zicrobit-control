import { useNavigate } from '@solidjs/router';
import { Component, createEffect, JSX } from 'solid-js';
import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from '../constants';
import { device } from './bluetooth';

type DeviceProviderProps = {
  children: JSX.Element;
};

const DeviceProvider: Component<DeviceProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  createEffect(async () => {
    if (!device) return navigate('/connect');
  }, [device]);

  return children;
};

export default DeviceProvider;
