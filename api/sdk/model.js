const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // x1, x2, and x3
    x1 = (data[0] - 42.392) / 10.4987038
    x2 = (data[1] - 88.572) / 19.12842412 
    x3 = (data[2] - 142.828) / 22.7542948 
    return [x1, x2, x3]
}

function denormalized(data){
    y1 = (data[0] * 9.204294545) + 74.52
    y2 = (data[1] * 14.51976402) + 51.11
    y3 = (data[2] * 24.34953181) + 159.61
    return [y1, y2, y3]
}


async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/nandiko-21/Bot-UAS-SC-Nandiko/main/public/ann_pred_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
