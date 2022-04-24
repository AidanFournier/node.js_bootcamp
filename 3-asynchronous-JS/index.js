const fs = require('fs');
const superagent = require('superagent');


// #3
const readFilePromise = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => { // this is where we do the asynchronous work
            if (err) reject("I could not find that file :(")
            resolve(data); // this data is the value the promise returnss to us
        })
    })
}

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject("I could not write that file :(")
            resolve('success');
        });
    });
}

// #4: Async/Await
// async: code that keeps running in the background, without blocking event loop
// point is to make our ccode look more synchronous while actually being async behing the scenes


const getDogPic = async () => {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        // this returns a promise, and if we don't 'await' it, iit will sve the promise to this variable
        const res1Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res2Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res3Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1Promise, res2Promise, res3Promise]);
        const imgs = all.map(el => el.body.message)
        console.log(imgs);

        await writeFilePromise('dog-img.txt', imgs.join('\n')); // '\n' will put each string in a new line
        console.log("random dog image saved to file");
    } catch (err) {
        console.log(err);
        throw(err);
    }

    return '2: READY'
};

// #5.2 Using value returned from async functions, using async/await
// we don't want to created another named function, so we're going to use us an immediately invoked function expression ('iffy??')
// in parentheses we define our function, then we call it right away

(async () => {
    try {
        console.log('1: Will get dog pic!');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Done getting dog pic!');
    } catch(err) {
        console.log ("Error!!!");
    }
})();

// #5.1 Using value returned from async function, using promises and .then

// console.log('1: Will get dog pic!')
// getDogPic().then(x => {
//     console.log(x);
//     console.log('3: Done getting dog pic!');
// })
// .catch(err => {
//     console.log ("Error!!!");
// })



// #3.2
// readFilePromise(`${__dirname}/dog.txt`)
// .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
// }).then(res => {
//     console.log(res.body.message);
//     return writeFilePromise('dog-img.txt', res.body.message)
// })
// .then(() => {
//     console.log("random dog image saved to file")
// })
// .catch(err => {
//     console.log(err.message)
// })


// #2
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`) // this method actually returns a promise
        // a promise basically implements the concept of a future value, a vlue we're expecting to receive in the future
        // "Hey server, plese get me a dog image in the background and then let me know when you're ready and give me that data back"
        // at this point, it's a pending promise
        // next we need to consume it (.then)
        // we pass .then a callback function, which is called as soon as the promise has come back with the data
        // but this is still callbacks? How does this help callback hell? Already it's helping because we can chain then instead of nesting
        // when a promise comes back with the data it becomes a resolved promise; might not lway be ssuccessful, could be error, so we say a resolved promise can either be fulfilled or rejected
        //.then only deals with fulfilled promises; we can use catch for the others
//         .then(res => {
//             console.log(res.body.message);

//             fs.writeFile('dog-img.txt', res.body.message, err => {
//                 if (err) return console.log(err.message)
//                 console.log("random dog image saved to file")
//             });
//         })
//         .catch(err => {
//             console.log(err.message)s
//         })
// });