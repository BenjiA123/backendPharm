(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{K1Id:function(e,t,a){"use strict";a.r(t),a.d(t,"TransactionModule",(function(){return y}));var n=a("ofXK"),r=a("tyNb"),i=a("fXoL"),o=a("PSNM"),c=a("Wp6s");function l(e,t){if(1&e&&(i.Tb(0,"mat-card-content"),i.Nc(1),i.Sb()),2&e){const e=i.dc();i.Ab(1),i.Pc("Creator : ",null==e.singleTrans?null:e.singleTrans.item.drug,"")}}let s=(()=>{class e{constructor(e,t){this.appTransService=e,this.route=t}ngOnInit(){this.appTransService.getOneTransaction(this.route.snapshot.params.id).subscribe(e=>{this.singleTrans=e.data.document})}}return e.\u0275fac=function(t){return new(t||e)(i.Nb(o.a),i.Nb(r.a))},e.\u0275cmp=i.Hb({type:e,selectors:[["app-transactio-detail"]],decls:22,vars:11,consts:[[1,"header"],[1,"card"],[4,"ngFor","ngForOf"]],template:function(e,t){1&e&&(i.Tb(0,"h4",0),i.Nc(1,"TRANSACTION DETAIL"),i.Sb(),i.Tb(2,"mat-card",1),i.Tb(3,"mat-card-header"),i.Tb(4,"mat-card-title"),i.Tb(5,"strong"),i.Nc(6,"Customer Name:"),i.Sb(),i.Nc(7),i.Sb(),i.Tb(8,"mat-card-subtitle"),i.Nc(9),i.ec(10,"date"),i.Sb(),i.Sb(),i.Tb(11,"mat-card-content"),i.Nc(12),i.Sb(),i.Tb(13,"mat-card-content"),i.Nc(14),i.Sb(),i.Tb(15,"mat-card-content"),i.Nc(16),i.Sb(),i.Tb(17,"mat-card-content"),i.Nc(18),i.Sb(),i.Tb(19,"mat-card-content"),i.Nc(20),i.Sb(),i.Lc(21,l,2,1,"mat-card-content",2),i.Sb()),2&e&&(i.Ab(7),i.Pc(" ",null==t.singleTrans?null:t.singleTrans.customerName,""),i.Ab(2),i.Pc("Transaction Date: ",i.gc(10,8,null==t.singleTrans?null:t.singleTrans.transactionDate,"fullDate"),""),i.Ab(3),i.Pc("Total Price: ",null==t.singleTrans?null:t.singleTrans.totalprice,""),i.Ab(2),i.Pc("Approver: ",null==t.singleTrans?null:t.singleTrans.approver.name,""),i.Ab(2),i.Pc("Approved: ",null==t.singleTrans?null:t.singleTrans.approved,""),i.Ab(2),i.Pc("Payment Method: ",null==t.singleTrans?null:t.singleTrans.paymentMethod,""),i.Ab(2),i.Pc("Creator : ",null==t.singleTrans?null:t.singleTrans.creator.name,""),i.Ab(1),i.mc("ngForOf",t.singleTrans.drugs))},directives:[c.a,c.c,c.f,c.e,c.b,n.m],pipes:[n.e],styles:[".card[_ngcontent-%COMP%]{width:70%;margin:3% 15%;color:#fff;background-color:#dc143c}.header[_ngcontent-%COMP%]{text-align:center;color:#dc143c}"]}),e})();var d=a("YIDO"),b=a("bTqV");const m=["transactionsGrid"];function p(e,t){if(1&e&&i.Ob(0,"igx-column",7),2&e){const e=t.$implicit;i.mc("sortable",e.sortable)("filterable",e.filterable)("hasSummary",e.hasSummary)("field",e.field)("header",e.header)("dataType",e.dataType)("editable",!0)}}function u(e,t){if(1&e){const e=i.Ub();i.Tb(0,"span",8),i.Tb(1,"button",9),i.Zb("click",(function(){i.Dc(e);const a=t.cell;return i.dc(2).approveTrans(a.value)})),i.Nc(2," APPROVE "),i.Sb(),i.Sb()}}function g(e,t){if(1&e&&(i.Tb(0,"span",8),i.Tb(1,"button",10),i.Nc(2," DETAILS "),i.Sb(),i.Sb()),2&e){const e=t.cell;i.Ab(1),i.oc("routerLink","detail/",e.value,"")}}function T(e,t){if(1&e&&(i.Tb(0,"igx-grid",2,3),i.Lc(2,p,1,7,"igx-column",4),i.Tb(3,"igx-column",5),i.Lc(4,u,3,0,"ng-template",6),i.Sb(),i.Tb(5,"igx-column",5),i.Lc(6,g,3,1,"ng-template",6),i.Sb(),i.Sb()),2&e){const e=i.dc();i.mc("primaryKey","_id")("paging",!0)("perPage",10)("allowFiltering",!0)("showToolbar",!0)("columnPinning",!0)("columnHiding",!0)("data",e.transactions)("autoGenerate",!1)("rowEditable",!1)("exportExcel",!0)("allowFiltering",!0),i.Ab(2),i.mc("ngForOf",e.idxColumnData),i.Ab(1),i.mc("filterable",!1),i.Ab(2),i.mc("filterable",!1)}}const h=[{path:"",component:(()=>{class e{constructor(e){this.appTransactionService=e,this.transactions=[],this.idxColumnData=[{dataType:"string",width:"20%",hasSummary:!1,field:"customerName",sortable:!1,header:"Customer Name ",filterable:!1},{dataType:"date",width:"15%",hasSummary:!1,field:"transactionDate",sortable:!0,header:"Date ",filterable:!0},{dataType:"string",width:"15%",hasSummary:!1,field:"creator.name",sortable:!1,header:"Creator ",filterable:!0},{dataType:"string",width:"15%",hasSummary:!1,field:"approver.name",sortable:!1,header:"Approver ",filterable:!0},{dataType:"number",width:"15%",hasSummary:!0,field:"totalprice",sortable:!1,header:"Total ",filterable:!1},{dataType:"boolean",width:"10%",hasSummary:!1,field:"approved",sortable:!0,header:"Approved ",filterable:!1}]}ngOnInit(){this.appTransactionService.getAllTransaction().subscribe(e=>{this.transactions=e.data.document})}approveTrans(e){this.appTransactionService.approveTrans(e).subscribe()}}return e.\u0275fac=function(t){return new(t||e)(i.Nb(o.a))},e.\u0275cmp=i.Hb({type:e,selectors:[["app-transaction"]],viewQuery:function(e,t){var a;1&e&&i.Rc(m,!0,d.c),2&e&&i.zc(a=i.ac())&&(t.grid=a.first)},decls:5,vars:1,consts:[[1,"screen_size_error"],["toolbarTitle","TRANSACTIONS","width","'80%'","class","transactionsGrid","id","transactionsGrid | async","exportText","Export","exportExcelText","Export to Excel",3,"primaryKey","paging","perPage","allowFiltering","showToolbar","columnPinning","columnHiding","data","autoGenerate","rowEditable","exportExcel",4,"ngIf"],["toolbarTitle","TRANSACTIONS","width","'80%'","id","transactionsGrid | async","exportText","Export","exportExcelText","Export to Excel",1,"transactionsGrid",3,"primaryKey","paging","perPage","allowFiltering","showToolbar","columnPinning","columnHiding","data","autoGenerate","rowEditable","exportExcel"],["transactionsGrid",""],[3,"sortable","filterable","hasSummary","field","header","dataType","editable",4,"ngFor","ngForOf"],["field","_id","header"," ",3,"filterable"],["igxCell",""],[3,"sortable","filterable","hasSummary","field","header","dataType","editable"],["tabindex","0"],["mat-stroked-button","",3,"click"],["mat-stroked-button","",3,"routerLink"]],template:function(e,t){1&e&&(i.Tb(0,"h5"),i.Nc(1,"TRANSACTIONS"),i.Sb(),i.Tb(2,"h4",0),i.Nc(3,"PLEASE USE A LAPTOP TO VIEW THIS PAGE\u2714\u2714\ud83d\ude01"),i.Sb(),i.Lc(4,T,7,15,"igx-grid",1)),2&e&&(i.Ab(4),i.mc("ngIf",t.transactions.length>0))},directives:[n.n,d.c,n.m,d.b,d.a,b.b,r.d],styles:["h5[_ngcontent-%COMP%]{text-align:center;margin-top:3rem}@media only screen and (max-width:1000px){h5[_ngcontent-%COMP%]{text-align:center;margin-top:7rem;margin-bottom:-5rem}}@media only screen and (max-width:480px){h5[_ngcontent-%COMP%]{text-align:center;margin-top:7rem;margin-bottom:0}}"]}),e})()},{path:"detail/:id",component:s}];let f=(()=>{class e{}return e.\u0275mod=i.Lb({type:e}),e.\u0275inj=i.Kb({factory:function(t){return new(t||e)},imports:[[r.g.forChild(h)],r.g]}),e})();var S=a("rhD1");let y=(()=>{class e{}return e.\u0275mod=i.Lb({type:e}),e.\u0275inj=i.Kb({factory:function(t){return new(t||e)},imports:[[n.c,d.d,f,S.a]]}),e})()}}]);