const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {
        logo: "A",
        url: "https://www.acfun.cn"
    },
    {
        logo: "B",
        url: "https://www.bilibili.com"
    }
];
const simplifyUrl = (url)=>{
    return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "") // 删除 / 开头的内容
    ;
};
const render = ()=>{
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi);
        $li.on("click", ()=>{
            window.open(node.url);
        });
        $li.on("click", ".close", (e)=>{
            e.stopPropagation() // 阻止冒泡
            ;
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$(".addButton").on("click", ()=>{
    let url = window.prompt("请问你要添加的网址是啥？");
    if (url.indexOf("http") !== 0) url = "https://" + url;
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem("x", string);
};
//输入框键盘事件,阻止冒泡
//   $('input').on('keypress', (e) => {
//     e.stopPropagation();
// });
//键盘事件：跳转对应的网页
// $(document).on('keypress', (e) => {
//     const {key} = e
//     for (let i = 0; i < hashMap.length; i++) {
//       if (hashMap[i].logo.toLowerCase() === key) {
//         window.open(hashMap[i].url)
//       }
//     }
//   });
$(document).on("keyup", (e)=>{
    const { key , altKey  } = e;
    for(let i = 0; i < hashMap.length; i++)if (hashMap[i].logo.toLowerCase() === key && altKey) window.open(hashMap[i].url);
});

//# sourceMappingURL=index.de158e3a.js.map
