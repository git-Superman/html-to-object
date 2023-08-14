### npm install

```cmd
npm install html-to-object -save
```


### yarn install

```cmd
npm install html-to-object
```


### test
```js
const hto = require('html-to-object')
const obj = hto(
    `<ul class="list" data-title="UL">
        <li data-href="li 1"><a href="a href 1">T1</a></li>
        <li data-href="li 2"><a href="a href 2">T2</a></li>
        <li data-href="li 3"><a href="a href 3">T3</a></li>
    </ul>`,
    {
        title: ".list/attr(data-title)",
        html: "ul/html()",
        list1: "ul li/each(self/text(), self/attr(data-href))",
        list2: "ul li/each(a/text(), a/attr(href))"
    }
);

console.log(obj);
// console
/*
    {
        title: 'UL',
        html: '<li data-href="li 1"><a href="a href 1">T1</a></li>\n' +
            '        <li data-href="li 2"><a href="a href 2">T2</a></li>\n' +
            '        <li data-href="li 3"><a href="a href 3">T3</a></li>',
        list1: [ [ 'T1', 'li 1' ], [ 'T2', 'li 2' ], [ 'T3', 'li 3' ] ],
        list2: [ [ 'T1', 'a href 1' ], [ 'T2', 'a href 2' ], [ 'T3', 'a href 3' ] ]
    }
*/
```