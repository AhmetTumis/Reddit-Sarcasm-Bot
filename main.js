const Snoowrap = require('snoowrap');
const { CommentStream } = require('snoostorm');
const BOT_START = Date.now() / 1000;

const client = new Snoowrap({

    userAgent: 'ekonomiiyiyegidiyor',
    clientId: 'your-social-sec-number',
    clientSecret: 'I-love-aleynatilki',
    username: 'Spongebob',
    password: 'sPoNgEbObIsThEMvp'
});

const canSummon = (msg) => {
    return msg && msg.toLowerCase().includes('u/yourbotsname');
};

const comments = new CommentStream(client, { 
    subreddit: "uptoyou", 
    limit: 50, 
    pollTime: 10000 
});

let commentToConvertid = "";
let mockedtext = "";

comments.on('item', (item) => {

    if(item.created_utc > BOT_START) return;
    if(!canSummon(item.body)) return;

    //have I ever summoned before? pls check its

    console.log(item.created_utc);
    console.log(item.body);

    if(item.parent_id != null){
        
        commentToConvertid = item.parent_id;
        
        client.getComment(commentToConvertid).fetch().then(comment => {

            console.log(comment.body);
            console.log(comment.author.name);
            mockedtext = mock(comment.body);

            let replyText = ("Hey " + comment.author.name + ", more like: " + mockedtext);
            console.log(replyText);
            item.reply(replyText);    
        });
    };
});

function tweak (c){
    return Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase();
};

function mock (text){
    text = text.split("").map(tweak).join("");
    return text;
};


