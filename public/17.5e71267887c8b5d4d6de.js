(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{McEE:function(e,r,t){"use strict";t.r(r),t.d(r,"SourcesModule",(function(){return b}));var a=t("ofXK"),i=t("tyNb"),o=t("YIDO"),n=t("fXoL"),s=t("Z9lu");const l=["sourcesGrid"];function c(e,r){if(1&e&&n.Pb(0,"igx-column",4),2&e){const e=r.$implicit;n.nc("sortable",e.sortable)("filterable",e.filterable)("hasSummary",e.hasSummary)("field",e.field)("header",e.header)("dataType",e.dataType)("editable",!0)}}const d=[{path:"",component:(()=>{class e{constructor(e){this.sourceService=e,this.idxColumnData=[{dataType:"string",width:"15%",hasSummary:!1,field:"name",sortable:!1,header:"Vendor Name ",filterable:!0},{dataType:"string",width:"20%",hasSummary:!1,field:"address",sortable:!1,header:"Address ",filterable:!1},{dataType:"date",width:"15%",hasSummary:!1,field:"purchaseDate",sortable:!0,header:"Date ",filterable:!1}]}ngOnInit(){this.sourceService.getAllSources().subscribe(e=>{this.sources=e.data.document})}}return e.\u0275fac=function(r){return new(r||e)(n.Ob(s.a))},e.\u0275cmp=n.Ib({type:e,selectors:[["app-sources"]],viewQuery:function(e,r){var t;1&e&&n.Sc(l,!0,o.c),2&e&&n.Ac(t=n.bc())&&(r.grid=t.first)},decls:10,vars:13,consts:[[1,"screen_size_error"],["toolbarTitle","VENDORS","width","'80%'","id","sourcesGrid | async","exportText","Export","exportExcelText","Export to Excel",1,"sourcesGrid",3,"primaryKey","paging","perPage","allowFiltering","showToolbar","columnPinning","columnHiding","data","autoGenerate","rowEditable","exportExcel"],["sourcesGrid",""],[3,"sortable","filterable","hasSummary","field","header","dataType","editable",4,"ngFor","ngForOf"],[3,"sortable","filterable","hasSummary","field","header","dataType","editable"]],template:function(e,r){1&e&&(n.Pb(0,"br"),n.Pb(1,"br"),n.Ub(2,"h5"),n.Oc(3,"VENDORS"),n.Tb(),n.Ub(4,"h4",0),n.Oc(5,"PLEASE USE A LAPTOP TO VIEW THIS PAGE\u2714\u2714\ud83d\ude01"),n.Tb(),n.Ub(6,"igx-grid",1,2),n.Mc(8,c,1,7,"igx-column",3),n.Tb(),n.Pb(9,"br")),2&e&&(n.Bb(6),n.nc("primaryKey","_id")("paging",!0)("perPage",10)("allowFiltering",!0)("showToolbar",!0)("columnPinning",!0)("columnHiding",!0)("data",r.sources)("autoGenerate",!1)("rowEditable",!1)("exportExcel",!0)("allowFiltering",!0),n.Bb(2),n.nc("ngForOf",r.idxColumnData))},directives:[o.c,a.m,o.b],styles:["h5[_ngcontent-%COMP%]{text-align:center;margin-top:3rem}"]}),e})()}];let u=(()=>{class e{}return e.\u0275mod=n.Mb({type:e}),e.\u0275inj=n.Lb({factory:function(r){return new(r||e)},imports:[[i.g.forChild(d)],i.g]}),e})(),b=(()=>{class e{}return e.\u0275mod=n.Mb({type:e}),e.\u0275inj=n.Lb({factory:function(r){return new(r||e)},imports:[[a.c,u,o.d]]}),e})()}}]);