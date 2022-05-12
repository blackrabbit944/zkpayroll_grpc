import {recoverTypedSignature_v4} from 'eth-sig-util';
import eip55 from 'eip55';

/**
 * Implements the SayHello RPC method.
 */
const CheckSign = function(call, callback) {
    console.log('call.request.',call.request);

    const recovered =  recoverTypedSignature_v4({
        data : JSON.parse(call.request.sign_params),
        sig  : call.request.sign
    });

    // console.log('recovered',recovered);
    // console.log('recovered_eip55',eip55.encode(recovered));
    // console.log('wallet_address',call.request.wallet_address);
    if (
        eip55.encode(recovered) === eip55.encode(call.request.wallet_address)
    ) {
        callback(null, {message:'success'});
    } else {
        callback(null, {message:'error'});
    }
}

module.exports = {
    CheckSign : CheckSign
}