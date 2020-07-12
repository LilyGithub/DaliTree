import React, { Component } from 'react';
import '../daliTree/dist/index';
import './style/base.less';
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
    }

    render(){
        return (
            <div className="api-document">
                <header className="main-header">
                    <div className="header-guid-contain">
                        <div className="header-guid"> 
                            <a className="logo-link per6"> 
                                <img src={logo} alt="" height="20"></img>
                                <span className="logo-name">Dali</span>
                            </a>
                            <nav className="css-79txt3">
                                <a className="nav-item" href="/docs/getting-started.html">文档</a>
                                <a className="nav-item" href="/tutorial/tutorial.html">使用指南</a>
                                <a className="nav-item" href="/blog/">博客</a>
                                <a className="nav-item" href="/community/support.html">支持作者</a>
                            </nav>
                        </div>
                    </div>
                </header>
                <div className="top-content">
                    <svg t="1594384523431" className="absolute tp100" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2811" width="500" height="500">
                        <path fill="#353A44" d="M512 512m-394.666667 0a394.666667 394.666667 0 1 0 789.333334 0 394.666667 394.666667 0 1 0-789.333334 0Z" p-id="2812" data-spm-anchor-id="a313x.7781069.0.i6" className=""></path>
                        <path fill="#282c34" d="M512 512m-352 0a352 352 0 1 0 704 0 352 352 0 1 0-704 0Z" p-id="2813" data-spm-anchor-id="a313x.7781069.0.i3" className=""></path>
                        <path fill="#353A44" d="M448 473.6l-160-160c-4.266667-4.266667-12.8-4.266667-17.066667 0-38.4 46.933333-61.866667 102.4-68.266666 166.4 0 6.4 4.266667 12.8 12.8 12.8h226.133333c8.533333 2.133333 14.933333-10.666667 6.4-19.2zM439.466667 529.066667H215.466667c-6.4 0-12.8 6.4-12.8 12.8 6.4 61.866667 32 119.466667 68.266666 166.4 4.266667 6.4 12.8 6.4 17.066667 0l160-160c8.533333-6.4 2.133333-19.2-8.533333-19.2zM529.066667 215.466667v226.133333c0 10.666667 12.8 14.933333 21.333333 8.533333l160-160c4.266667-4.266667 4.266667-12.8 0-17.066666-46.933333-38.4-102.4-61.866667-166.4-68.266667-8.533333-2.133333-14.933333 2.133333-14.933333 10.666667zM494.933333 439.466667V215.466667c0-6.4-6.4-12.8-12.8-12.8-61.866667 6.4-119.466667 32-166.4 68.266666-6.4 4.266667-6.4 12.8 0 17.066667l160 160c6.4 8.533333 19.2 2.133333 19.2-8.533333zM584.533333 494.933333H810.666667c6.4 0 12.8-6.4 12.8-12.8-6.4-61.866667-32-119.466667-68.266667-166.4-4.266667-6.4-12.8-6.4-17.066667 0L576 473.6c-8.533333 8.533333-2.133333 21.333333 8.533333 21.333333zM576 550.4l160 160c4.266667 4.266667 12.8 4.266667 17.066667 0 38.4-46.933333 61.866667-102.4 68.266666-166.4 0-6.4-4.266667-12.8-12.8-12.8H584.533333c-10.666667-2.133333-17.066667 10.666667-8.533333 19.2zM473.6 576l-160 160c-4.266667 4.266667-4.266667 12.8 0 17.066667 46.933333 38.4 102.4 61.866667 166.4 68.266666 6.4 0 12.8-4.266667 12.8-12.8V584.533333c2.133333-10.666667-10.666667-17.066667-19.2-8.533333zM529.066667 584.533333V810.666667c0 6.4 6.4 12.8 12.8 12.8 61.866667-6.4 119.466667-32 166.4-68.266667 6.4-4.266667 6.4-12.8 0-17.066667L550.4 576c-8.533333-8.533333-21.333333-2.133333-21.333333 8.533333z" p-id="2814" data-spm-anchor-id="a313x.7781069.0.i4" className="">
                        <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      from="0 512 512"
                      to="360 512 512"
                      dur="30"
                      repeatCount="indefinite" />
                        </path>
                    </svg>
                    <div className="center-content">
                        <h1 className="title-h1">Dali Tree</h1>
                        <p className="content-p">A JavaScript library for building rich tree</p>
                        <div className="content-opt">
                            <a className="button max-button">
                               开始使用
                            </a>
                            {/* <a className="linkTo">
                               开始使用
                            </a> */}
                        </div>
                    </div>
                </div>
                <div className="deom-case">
                   
                    <div className='case-view'>
                        <div className="view-title">RESULT</div>
                        <div id='daliTree' className="view-content"></div> 
                    </div>
                </div>
            </div>
        )
    }
}