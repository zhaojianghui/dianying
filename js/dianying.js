'use strict';
var page={
	stat0: '',
	stat1: '',
	stat2: '',
	sort_key: 16,
	pn:0,
	layer:'',
	conter:$('.conter'),
	typeItems:$('.type-item'),
	loadItems:$('.load-item'),
	yearItems:$('.year-item'),
	pageItems:$('.page-item'),
	titleItems:$('.title-item'),
	init:function(){
        this.getData();
        this.getType();
        this.getLoad();
        this.getYear();
        this.getPage();
        this.getTitle();
	},
	getType:function(){
       var _this=this;
       this.typeItems.click(function(){
       	   $(this).addClass('active').siblings().removeClass('active');
       	   $('.page-item').eq(0).addClass('active').siblings().removeClass('active');
       	   var tag = $(this).html();
       	   _this.stat0 = (tag == "全部" ? "" : tag);
		   _this.pn = 0;
		   _this.getData(); 
		   
       })
	},
	getLoad:function(){
       var _this=this;
       this.loadItems.click(function(){
       	   $(this).addClass('active').siblings().removeClass('active'); 
       	   $('.page-item').eq(0).addClass('active').siblings().removeClass('active');
       	    var load = $(this).html();
       	   _this.stat1 = (load == "全部" ? "" : load);
		   _this.pn = 0;
		   _this.getData();  
       })
	},
	getYear:function(){
       var _this=this;
       this.yearItems.click(function(){
       	   $(this).addClass('active').siblings().removeClass('active');
       	   $('.page-item').eq(0).addClass('active').siblings().removeClass('active');
       	    var year = $(this).html();
       	   _this.stat2 = (year == "全部" ? "" : year);
		   _this.pn = 0;
		   _this.getData();    
       })
	},
	getTitle: function(){
		var _this = this;
		this.titleItems.click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			_this.pageItems.eq(0).addClass('active').siblings().removeClass('active');
			_this.sort_key = $(this).attr('sort_key');
			_this.pn = 0;
			_this.getData();
		});
	},
	getPage:function(){
		var _this=this;
		this.pageItems.click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			var page = $(this).html();
		   _this.pn =($(this).html()-1)*8;
		   _this.getData();   

		})
	},
	getData:function(){
		var _this=this;
		$.ajax({
          url:"https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?resource_id=28286&query=电影&sort_type=1&rn=8",
          data: {
				stat0: _this.stat0,
				stat1: _this.stat1,
				stat2: _this.stat2,
				sort_key: _this.sort_key,
				pn: _this.pn
			},
			dataType:'jsonp',
			jsonp:'cb',
		   success:function(data){
               _this.readData(data);
              
		   }
		})
		layer.load();     
		setTimeout(function(){
		  layer.closeAll('loading');
		}, 1000);
	},
	readData:function(r){
        var result=r.data[0].result;
         console.log(result);
         var con='';
         for(var i=0;i<result.length;i++){
         	con+=`<div class="cont">
    		  <img src="${result[i].kg_pic_url}">
    		  <p class="namer">${result[i].ename}</p>
    		  <p>${result[i].additional}</p>
    	      </div>`
            
         }
         this.conter.html(con);
	}
}
page.init();