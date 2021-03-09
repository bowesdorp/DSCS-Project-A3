import { CONFIG_MANAGER } from '../data/Injectables';
import { URLNames } from '../data/enum/configNames';
import { getValue } from './injector';
import axios from 'axios';

export const errorFormatter = (error) => {
  if (error && error.response && error.response.data && error.response.data.error) {
    const response = { config: error.config, ...error.response, ...error.response.data };
    // delete data to avoid confusion
    delete response.data;
    return response;
  }
  return error;
};

export const responseFormatter = (response) => {
  if (response && response.data && typeof response.data.data !== 'undefined') {
    return { ...response, ...response.data };
  }
  return response;
};

export const postFlight = (flight) => {
  const configManager = getValue(CONFIG_MANAGER);
  const apiUrl = configManager.getURL(URLNames.API);
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Credentials': 'true',
  };

  console.log(flight);
  // https://v0x71ox2g0.execute-api.eu-central-1.amazonaws.com/v1/route?baggage=TRUE&check_in=TRUE&date=2021-03-10&extra_time=30&flight_code=KL1234&priority=TRUE&u_coordinates=123123,123123

  const query = `baggage=${flight.baggage}&check_in=${flight.checkIn}&date=${flight.date}&extra_time=${flight.extraTime}&flight_code=${flight.flightNumber}&priority=${flight.priority}&u_coordinates=${flight.coordinates}`;

  return new Promise((resolve, reject) => {
    axios
      .post(
        `${apiUrl}/v1/route?${query}`,
        {},
        { headers },
      )
      .then((response) => {
        resolve(response);
      })
      .catch(() => {
        reject();
      });
  });
};
