const hto = require('./index');


const html = `<ul class="list" data-title="UL">
                <li data-href="li 1"><a href="a href 1">T1</a></li>
                <li data-href="li 2"><a href="a href 2">T2</a></li>
                <li data-href="li 3"><a href="a href 3">T3</a></li>
            </ul>`
    , parser = {
        title: ".list/attr(data-title)",
        html: "ul/html()",
        list1: "ul li/each(self/text(), self/attr(data-href))",
        list2: "ul li/each(a/text(), a/attr(href))"
    }



const result = hto(html, parser);

console.log(result);