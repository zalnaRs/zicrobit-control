import {
  UART_SERVICE_UUID,
  UART_TX_CHARACTERISTIC_UUID,
  UART_RX_CHARACTERISTIC_UUID,
} from '../constants';
import { setData } from './store';

export let device: BluetoothDevice | null = null;
export let gatt: BluetoothRemoteGATTServer | null = null;
export let rxCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
let currData = '';

const encoder = new TextEncoder();

export const decodeData = (ev: any) => {
  let receivedData = [];
  for (var i = 0; i < ev.target.value.byteLength; i++) {
    receivedData[i] = ev.target.value.getUint8(i);
  }

  const receivedString = String.fromCharCode.apply(null, receivedData);
  return receivedString;
};

export const decodeToJSON = (data: string) => {
  let json = {};
  console.log(data);
  try {
    const _json = JSON.parse(data);
    json = _json;
    if (_json) currData = '';
  } finally {
    setData(json);
  }
};

export const refreshData = async () => {
  await rxCharacteristic.writeValue(encoder.encode(',1,'));
};

export const connect = async (_device: BluetoothDevice) => {
  device = _device;
  gatt = await _device.gatt.connect();
  const service = await gatt.getPrimaryService(UART_SERVICE_UUID);

  const txCharacteristic = await service.getCharacteristic(
    UART_TX_CHARACTERISTIC_UUID
  );
  txCharacteristic.startNotifications();
  txCharacteristic.addEventListener('characteristicvaluechanged', (ev: any) => {
    currData += decodeData(ev);

    decodeToJSON(currData);
  });

  rxCharacteristic = await service.getCharacteristic(
    UART_RX_CHARACTERISTIC_UUID
  );

  await refreshData();
};
