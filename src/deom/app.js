import React, { Component } from 'react';
import {DaliTree} from 'daliTree';
import './style/base.less';
const ace = require('./lib/ace/ace.js');
require('./lib/ace/mode-javascript');
require('./lib/ace/theme-xcode');
export class App extends React.Component{
    constructor(props) {
        super(props);
    }
    getTreeNode(nodeId){
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
            }, 100);
        })
    
    }
    componentDidMount() {
        let daliTree = new DaliTree({
            renderDom: document.getElementById('daliTree'),
            /* lazyRender: {
                time: 1000,
                maxNum: 1000
            }, */
            dataInterface: this.getTreeNode,
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
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/xcode");
        editor.session.setMode("ace/mode/javascript");
    }

    render(){
        return (
            <div class="api-document">
                <div class="deom-case">
                    <pre id="editor" class="case-code" >
                        {'function foo(items) {\n' +
                            'var i;\n' +
                            'for (i = 0; i &lt; items.length; i++) {\n' +
                                'alert("Ace Rocks " + items[i]);\n' +
                            '}\n' +
                        '}\n'}
                    </pre>
                    <div id='daliTree' class='case-view'>

                    </div>
                </div>
                
            </div>
        )
    }
}