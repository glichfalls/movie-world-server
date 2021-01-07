import express from "express";
import {DB_URL, MONGO_COLLECTION_NAME, MONGO_DB_NAME, SERVER_PORT} from "./config/config";
import {Collection, MongoClient} from "mongodb";

interface JsonResponse {
    status: number;
    message: string;
    payload: any;
}

const get_collection = (callback: (collection: Collection) => void): void => {
    MongoClient.connect(DB_URL, { useUnifiedTopology: true}, (err, con) => {
        callback(con.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_NAME));
    });
};

const response = (status: number = 200, message: string = "OK", payload: any = null): JsonResponse => {
    return {status: status, message: message, payload: payload};
};

const cors = require('cors');
const app = express();
app.use(cors());

app.get('/likes', (req, res) => {
    get_collection(collection => {
       collection.find({}).toArray(function(err, result) {
           if(err) {
               res.json(response(500, err.toString()));
           } else {
               res.json(response(200, 'OK', result));
           }
       });
    });
});

app.get('/movie/:movie', ((req, res) => {
    const movie: number = Number(req.params.movie);
    get_collection(collection => {
        collection.find({movie: movie}).count().then((count: number) => {
            if(count > 0) {
                res.json(response(204));
            } else {
                res.json(response(404, 'Not Found'));
            }
        });
    });
}));

app.post('/movie/:movie/like', ((req, res) => {
    const movie: number = Number(req.params.movie);
    get_collection(collection => {
        collection.find({movie: movie}).count().then((count: number) => {
            if(count === 0) {
                collection.insertOne({movie: movie}, error => {
                    if(error) {
                        res.json(response(500, error.toString()));
                    } else {
                        res.json(response());
                    }
                });
            } else {
                res.json(response(409, 'This movie is already liked.'));
            }
        });
    });
}));

app.delete('/movie/:movie/like', ((req, res) => {
    const movie: number = Number(req.params.movie);
    get_collection(collection => {
        collection.find({movie: movie}).count().then((count: number) => {
            if(count > 0) {
                collection.deleteMany({movie: movie}, error => {
                    if(error) {
                        res.json(response(500, error.toString()));
                    } else {
                        res.json(response());
                    }
                });
            } else {
                res.json(response(409, 'This is not liked.'));
            }
        });
    });
}));

app.listen(SERVER_PORT, () => {
    console.log('server is running on port 5000.');
});
