import { Config } from '../core/config'
import { Transaction, BACKEND_SERVICES, TokenizedAnalysis } from './types';

export async function get_word_freq_response(data: Transaction[]):Promise<any>{
    let resp = {};
    const params = {
        method: 'POST', 
        url: Config.network_url + BACKEND_SERVICES.get_word_freq_response,
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(data),
    };


     await fetch(Config.network_url + BACKEND_SERVICES.get_word_freq_response, params)
        .then((response) => response.json())
        .then((data) => {
          resp = data;
          return resp;
        })
        .catch((error) => {
          console.error('Error:', error);
          return error;
        });

    console.log("success", resp)

    return resp;
   
}