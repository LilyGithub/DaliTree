import DaliTree from '../daliTree'
let sync = false;
let getTreeNode = nodeId =>{
    let treeNode = [];
    if(!nodeId){
        for(let a=0; a<5; a++){
            let nodes = {
                id:'a'+a,
                name:'a'+a,
                isParent: true,
                expand: true,
                childNodes: []
            }
            for(let i=0; i<100000; i++){
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
    });

}
setTimeout(()=>{
    let daliTree = new DaliTree({
        renderDom: document.getElementById('tdom'),
        lazyRender: {
            time: 1000,
            maxNum: 5000
        },
        dataInterface: getTreeNode
    });
},100)
alert("jj")