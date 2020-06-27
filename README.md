--
options = {
    renderDom: domNode,
    type: 'async / sync',
    lazyRender: {
        time: 200, //休息时间
        maxNum: 1000, //一次渲染数量
    }
    dataInterface: nodeId=>{

    }, //可以返回Promise
    loadComplete: (treeNodes, loadNodes)=>{ //每次加载数据完成

    },
    loadBefore: (treeNodes)=>{ //每次加载数据之前

    },
    initCompete: (treeNodes)=>{ //初始化完成

    },
    nodeExpandAfter: node=>{ //展开收起回调

    }
    nodeClick: node=>{ //点击回调

    }
    nodeDbclick: node=>{ //双击回调

    }
}
let tree = new Tree(options);

--
node = {
    id:'nodeId',
    label:'node Name',
    isParent: false,
    checked：false, //是否选中
    childNode: [],
    expand: false,
    nodeHtmlHandle: node =>{ //节点改造
        return `<span>${node.name}</span>`;
    },
    _hasLoadData: false, //sync时加载状态
}









--目录结构
--baseBussiness
    --BaseDbService
    --bussiness
        --migrateService //迁移业务service
        --subrateService //同步业务service
        --...... //详情service
--Class BaseDbService {
    construct(){
        this.migrateService //迁移业务service
        this.subrateService //同步业务service
        this.infoService //详情service
        ...各个业务场景的service
    }
}

--目录结构（MysqlToOracle场景）
--MysqlToOracle
    --MysqlToOracleService （extends BaseDbService）
    --bussiness
        --migrateService (继承基础业务对应Service)
        --subrateService
        --......
Class MysqlToOracleService extends BaseDbService {
    construct(){
        this.migrateService = import(./migrateService) //对应场景下的service
        this.subrateService //同步业务service
        this.infoService //同步业务service
        ...各个业务场景的service
    }
}


---
businessMap {
    'MysqlToOracle': import(MysqlToOracle场景下的service),
    'OracleToKafKa': import(OracleToKafka场景下的service)
    ......
    defalut: import(baseDbservice)
}

--各个业务参加下调用service
    
    详情页面模块：   detailInfoService = businessMap[enginType].detailInfoService;
    

    