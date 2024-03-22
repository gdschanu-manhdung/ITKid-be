import axios from 'axios'

async function getTransactionHistory() {
    const YOUR_ACCESS_TOKEN = '123456789' //example

    const response = await axios.get(
        'https://api.momo.com/transaction-history',
        {
            headers: {
                Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`
            }
        }
    )

    return response.data
}
