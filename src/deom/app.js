import React, { Component } from 'react';
import {DaliTree} from 'daliTree';
import './style/base.less';
const ace = require('./lib/ace/ace.js');
require('./lib/ace/mode-javascript');
require('./lib/ace/theme-xcode');
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
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/xcode");
        editor.session.setMode("ace/mode/javascript");
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
                        <div class="css-v4xx2e css-1k80xq8">
                            <div class="css-1ezwgyu">
                                <a class="css-1053yfl" href="/docs/getting-started.html">Get Started</a>
                            </div>
                            <div class="css-1ezwgyu">
                                <a class="css-13foh4g" href="/tutorial/tutorial.html">Take the Tutorial<svg height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.53657 8.69699" class="css-b7q1rs"><path d="
                                    M.18254,8.697a.18149.18149,0,0,1-.12886-.31034L4.09723,4.34126.05369.29954a.18149.18149,
                                    0,0,1,.2559-.2559L4.4838,4.21785a.18149.18149,0,0,1,0,.2559L.30958,8.648A.18149.18149,
                                    0,0,1,.18254,8.697Z
                                " fill="currentColor"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
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