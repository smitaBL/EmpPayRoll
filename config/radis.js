import { createClient } from 'redis';

const radisdatabase = async () => {

    const client = createClient({
        legacyMode: true
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    client.on('connect', () => {
        console.log('Redis Connected Successfully!!!');
    });

    await client.connect();



}
export default radisdatabase;
