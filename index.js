const cheerio = require('cheerio');



function strIntoObjects(parser) {
    let type = parser.match(/\/\w+\(/)[0];
    let fns = parser.split(type);

    let target = fns[0];
    let fn2 = fns[1];
    
    fn2 = fn2.slice(0, -1);

    const methods = {
        '/text(': () => ({ target, type: 'text' }),
        '/html(': () => ({ target, type: 'html' }),
        '/attr(': () => ({ target, type: 'attr', attr: fn2 }),
        '/each(': () => ({ target, type: 'each', list: fn2.split(',').map(item => strIntoObjects((item).trim())) })
    }

    return methods[type] ? methods[type]() : null
}



// to objects
function strAllIntoObjects(parser) {
    let result = {};
    Object.keys(parser).forEach(key => {
        result[key] = strIntoObjects(parser[key]);
    });

    return result;
}



// format text
function formatText(parent, parser) {
    const self = parser.target === 'self' ? parent : parent.find(parser.target);
    switch (parser.type) {
        case 'text':
            return self.text().trim();
        case 'html':
            return (self.html() || '').trim();
        case 'attr':
            return (self.attr(parser.attr) || '').trim();
        default:
            return '';
    }
}


/**
 * @param {String} html
 * @param {Object} parser
 * @returns {Object}
 * 
 */
function htmlToObject(html, parser) {

    if( typeof parser !== 'object' ) throw Error('argument parser It\'s an object')

    const $ = cheerio.load(html || '');
    const parser_match = strAllIntoObjects(parser);
    const result = {}
    

    Object.keys(parser_match).forEach(key => {
        let item = parser_match[key];

        if( item )
        {
            if( item.type == 'each' ) {
                let list = [];
                $(item.target).each((i, item2) => {
                    list.push(item.list.map(self => formatText( $(item2), self)));
                });
                result[key] = list;
            }
            else {
                result[key] = formatText($('html'), item);
            }
        }
    });


    return result;
}


module.exports = htmlToObject