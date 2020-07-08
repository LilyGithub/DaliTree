import React, { Component } from 'react';
import {DaliTree} from 'daliTree';
import './style/base.less';
const ace = require('./lib/ace/ace.js');
require('./lib/ace/mode-javascript');
require('./lib/ace/theme-ambiance');
const logo = require('./style/img/logo.png');
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
        let daliTree2 = new DaliTree({
            renderDom: document.getElementById('daliTree2'),
            dataInterface: this.getTreeNode
        });
        let daliTree3 = new DaliTree({
            renderDom: document.getElementById('daliTree3'),
            dataInterface: this.getTreeNode
        });
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/ambiance");
        editor.session.setMode("ace/mode/javascript");
        var editor2 = ace.edit("editor2");
        editor2.setTheme("ace/theme/ambiance");
        editor2.session.setMode("ace/mode/javascript");
        var editor3 = ace.edit("editor3");
        editor3.setTheme("ace/theme/ambiance");
        editor3.session.setMode("ace/mode/javascript");
    }

    render(){
        return (
            <div class="api-document">
                <header class="main-header">
                    <div class="header-guid-contain">
                        <div class="header-guid"> 
                            <a class="logo-link per6"> 
                                <img src={logo} alt="" height="20"></img>
                                <span class="logo-name">Dali</span>
                            </a>
                            <nav class="css-79txt3">
                                <a class="nav-item" href="/docs/getting-started.html">文档</a>
                                <a class="nav-item" href="/tutorial/tutorial.html">使用指南</a>
                                <a class="nav-item" href="/blog/">博客</a>
                                <a class="nav-item" href="/community/support.html">支持作者</a>
                            </nav>
                        </div>
                    </div>
                </header>
                <div class="top-content">
                    <div class="center-content">
                        <h1 class="title-h1">Dali Tree</h1>
                        <p class="content-p">A JavaScript library for building rich tree</p>
                        <div class="content-opt">
                            <a class="button max-button">
                               开始使用
                            </a>
                            {/* <a class="linkTo">
                               开始使用
                            </a> */}
                        </div>
                    </div>
                </div>
                <div class="deom-case">
                    <div class="case-describe">
                        <h3>普通树</h3>
                        <p>
                            一般的tree
                        </p>
                    </div>
                    <div class="case-code">
                        <div class="code-title">CODE EDITOR</div>
                        <pre id="editor" class="code-tool" >
                            {'\nfunction foo(items) {\n' +
                                '    var i;\n' +
                                '    for (i = 0; i &lt; items.length; i++) {\n' +
                                '        alert("Ace Rocks " + items[i]);\n' +
                                '    }\n' +
                            '}\n'}
                        </pre>
                    </div>
                    <div id='daliTree' class='case-view'>
                            
                    </div>
                </div>
                <div class="deom-case">
                    <div class="case-code">
                        <div class="code-title">CODE EDITOR</div>
                        <pre id="editor2" class="code-tool" >
                            {'\nfunction foo(items) {\n' +
                                '    var i;\n' +
                                '    for (i = 0; i &lt; items.length; i++) {\n' +
                                '        alert("Ace Rocks " + items[i]);\n' +
                                '    }\n' +
                            '}\n'}
                        </pre>
                    </div>
                    <div id='daliTree2' class='case-view'>

                    </div>
                </div>
                <div class="deom-case">
                    <div class="case-code">
                        <div class="code-title">CODE EDITOR</div>
                        <pre id="editor3" class="code-tool" >
                            {'\nfunction foo(items) {\n' +
                                '    var i;\n' +
                                '    for (i = 0; i &lt; items.length; i++) {\n' +
                                '        alert("Ace Rocks " + items[i]);\n' +
                                '    }\n' +
                            '}\n'}
                        </pre>
                    </div>
                    <div id='daliTree3' class='case-view'>

                    </div>
                </div>
            </div>
        )
    }
}