import {DaliTree} from 'daliTree';
let sync = false;
let getTreeNode = nodeId =>{
    let data = {
        id:'root',
        name:'中国',
        isParent: true,
        expand: true,
        childNodes: [{
            id:'yunnan',
            name:'云南',
            isParent: true,
            expand: true,
            childNodes: [{
                id:'dali',
                name:'大理',
                isParent: true,
                expand: true,
                childNodes: [{
                    id:'dali1',
                    name:'洱源县',
                    isParent: false,
                    expand: true
                },{
                    id:'dali2',
                    name:'下关',
                    isParent: false,
                    expand: true
                },{
                    id:'dali3',
                    name:'风雨',
                    isParent: false,
                    expand: true
                }]
            },{
                id:'kunming',
                name:'昆明',
                isParent: true,
                expand: true,
                childNodes: []
            }]
        },{
            id:'zhejiang',
            name:'浙江',
            isParent: false,
            expand: true,
            childNodes: []
        }]
    }
    return new Promise(resolv => {
        setTimeout(()=>{
            resolv(data)
        }, 3000);
    })
    /* let treeNode = [];
    if(!nodeId){
        for(let a=0; a<5; a++){
            let nodes = {
                id:'a'+a,
                name:'a'+a,
                isParent: true,
                expand: true,
                childNodes: []
            }
            for(let i=0; i<10000; i++){
                nodes.childNodes.push({
                    id:'i'+a+'_'+i,
                    name:'i'+a+'_'+i,
                    isParent: true,
                    expand: true,
                    childNodes: [{
                        id:'i'+a+'_11'+i,
                        name:'i'+a+'_11'+i,
                    },{
                        id:'i'+a+'_22'+i,
                        name:'i'+a+'_22'+i,
                    }]
                })
            }
            treeNode.push(nodes)
        }
    } else {
        for(let i=0; i<100; i++){
            treeNode.push({
                id:'i'+nodeId+'_'+i,
                name:'i'+nodeId+'_'+i
            })
        }
    }
    return new Promise(revl =>{
        revl(treeNode)
    }); */

}
setTimeout(()=>{
    let daliTree = new DaliTree({
        renderDom: document.getElementById('tdom'),
        /* lazyRender: {
            time: 1000,
            maxNum: 1000
        }, */
        dataInterface: getTreeNode,
        loadBefore: (node)=> {
            console.info('loadBefore');
            console.info(node);
        },
        loadComplete: (node, data)=> {
            console.info('loadComplete');
            console.info(node);
            console.info(data);
        },
        renderComplete: (nodes)=> {
            console.info('renderComplete');
            console.info(nodes);
        },
        nodeExpandBefore: node=> {
            console.info('nodeExpandBefore');
            console.info(node);
        },
        nodeExpandAfter: node=>{
            console.info('nodeExpandAfter');
            console.info(node);
        },
        nodeClick: node=>{
            console.info('nodeClick');
            console.info(node);
        },
        nodeDbclick: node=>{
            console.info('nodeDbclick');
            console.info(node);
        },
        checkBefore: node=>{
            console.info('checkBefore');
            console.info(node);
        },
        checkAfter: node=>{
            console.info('checkAfter');
            console.info(node);
        }
    });
},100)