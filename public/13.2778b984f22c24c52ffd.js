(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"+s3p":function(t,e,n){"use strict";n.r(e),n.d(e,"DrugsModule",(function(){return C}));var r=n("ofXK"),a=n("tyNb"),i=n("YIDO"),c=n("EA+0"),s=n("fXoL"),o=n("uiWy"),u=n("PSNM"),d=n("XNiG"),l=n("AytR"),b=n("tk/3");const g=l.a.apiUrl+"/drug";let m=(()=>{class t{constructor(t){this.http=t,this.searchedDrugs=new d.a}searchDrugs(t){this.http.get(`${g}/search?q=${t}`).subscribe(t=>{this.drugs=t.document.data,this.searchedDrugs.next({drugs:[...this.drugs]})})}searchedDrugsListener(){return this.searchedDrugs.asObservable()}}return t.\u0275fac=function(e){return new(e||t)(s.Xb(b.b))},t.\u0275prov=s.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var h=n("qXBG"),p=n("0IaG"),f=n("3Pt+"),_=n("kmnG"),v=n("qFsG");let S=(()=>{class t{constructor(t){this.searchService=t}submitSearch(t){this.searchService.searchDrugs(t.value.search)}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(m))},t.\u0275cmp=s.Hb({type:t,selectors:[["app-search-comp"]],decls:8,vars:0,consts:[[3,"submit"],["search","ngForm"],["appearance","outline"],["matInput","","name","search","placeholder","Search Drugs:","ngModel","","type","text"],["searchInput","ngModel"],["type","submit",1,"btn","btn--crimson"]],template:function(t,e){if(1&t){const t=s.Ub();s.Tb(0,"form",0,1),s.Zb("submit",(function(){s.Dc(t);const n=s.Ac(1);return e.submitSearch(n)})),s.Tb(2,"mat-form-field",2),s.Ob(3,"input",3,4),s.Sb(),s.Tb(5,"button",5),s.Tb(6,"div"),s.Nc(7,"Search"),s.Sb(),s.Sb(),s.Sb()}},directives:[f.t,f.m,f.n,_.c,v.a,f.b,f.l,f.o],styles:["mat-form-field[_ngcontent-%COMP%]{width:35%;margin:3rem 1rem 0 10rem;height:3rem}form[_ngcontent-%COMP%]{margin-top:2.6rem;margin-bottom:0}.btn[_ngcontent-%COMP%]{width:20%;margin:auto}.btn[_ngcontent-%COMP%]:hover{transform:translateY(0);box-shadow:0}"]}),t})();var y=n("bTqV");const T=["drugsGrid"];function D(t,e){1&t&&s.Ob(0,"input",23)}function x(t,e){if(1&t){const t=s.Ub();s.Tb(0,"div",14),s.Tb(1,"form",15,16),s.Zb("submit",(function(){s.Dc(t);const e=s.Ac(2);return s.dc().addToQueue(e)})),s.Ob(3,"input",17),s.Ob(4,"input",18),s.Lc(5,D,1,0,"input",19),s.Ob(6,"input",20),s.Tb(7,"a",21),s.Zb("click",(function(){s.Dc(t);const n=e.$implicit;return s.dc().deleteDrugInTrans(n._id)})),s.Tb(8,"mat-icon"),s.Nc(9,"delete_forever"),s.Sb(),s.Sb(),s.Tb(10,"button",22),s.Tb(11,"mat-icon"),s.Nc(12,"done_outline"),s.Sb(),s.Sb(),s.Sb(),s.Sb()}if(2&t){const t=e.$implicit,n=e.index;s.Ab(3),s.mc("ngModel",t),s.Ab(1),s.mc("ngModel",t.genericName),s.Ab(1),s.mc("ngIf",0===n)}}function O(t,e){if(1&t){const t=s.Ub();s.Tb(0,"div",24),s.Zb("click",(function(){return s.Dc(t),s.dc().createPendingTransaction()})),s.Nc(1," SEND TRANS\n"),s.Sb()}}function w(t,e){if(1&t){const t=s.Ub();s.Tb(0,"span",25),s.Tb(1,"button",26),s.Zb("click",(function(){s.Dc(t);const n=e.cell;return s.dc().getDrug(n.value)})),s.Nc(2," ADD "),s.Sb(),s.Sb()}}const P=[{path:"",component:(()=>{class t{constructor(t,e,n,r,a){this.drugService=t,this.appTransactionService=e,this.searchService=n,this.authService=r,this._dialog=a,this.transactionQueue=[],this.transactionData=[]}addToQueue(t){t.invalid?this._dialog.open(c.a,{data:{message:"Invalid Transaction"}}):(this.transactionData.length>0&&(this.transactionData=this.transactionData.filter(e=>e.drug.id!=t.value.drug._id)),this.transactionData.push({customer:t.value.customer,drug:t.value.drug,quantity:t.value.quantity}))}ngOnInit(){this.drugsSub=this.searchService.searchedDrugsListener().subscribe(t=>{this.drugs=t.drugs}),this.drugService.getAllDrugs().subscribe(t=>{this.drugs=t.data.document})}getDrug(t){this.drugService.getOneDrug(t).subscribe(e=>{const n=e.data.document;this.transactionQueue.length>0&&(this.transactionQueue=this.transactionQueue.filter(e=>e.id!=t)),this.transactionQueue.push(n)})}deleteDrugInTrans(t,e){this.transactionQueue=this.transactionQueue.filter(e=>e.id!=t),this.transactionData=this.transactionData.filter(e=>e.drug._id!=t)}createPendingTransaction(){let t,e=[],n=[{drug:void 0,quantity:void 0}];for(let a=0;a<this.transactionData.length;a++)e.push(this.transactionData[a].customer),n.push({drug:this.transactionData[a].drug._id,quantity:this.transactionData[a].quantity}),t=e[0];n.shift();const r={drugs:n,customerName:t,creator:this.authService.getCurrentUser()._id};this.appTransactionService.createPendingTransaction(r).subscribe(t=>{this._dialog.open(c.a,{data:{message:"Transaction Created"}}),this.transactionQueue=[],this.transactionData=[]})}ngOnDestroy(){this.drugsSub.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(o.a),s.Nb(u.a),s.Nb(m),s.Nb(h.a),s.Nb(p.b))},t.\u0275cmp=s.Hb({type:t,selectors:[["app-drugs"]],viewQuery:function(t,e){var n;1&t&&s.Rc(T,!0,i.c),2&t&&s.zc(n=s.ac())&&(e.grid=n.first)},decls:19,vars:28,consts:[["class","transaction_drug",4,"ngFor","ngForOf"],["class","btn btn--crimson send_trans",3,"click",4,"ngIf"],[1,"screen_size_error"],["toolbarTitle","DRUGS","width","'80%'","id","drugsGrid | async","exportText","Export","exportExcelText","Export to Excel",1,"drugsGrid",3,"primaryKey","paging","perPage","allowFiltering","showToolbar","columnPinning","columnHiding","data","autoGenerate","rowEditable","exportExcel"],["drugsGrid",""],["width","25%","field","genericName","header","Generic Name ",3,"sortable"],["width","25%","field","brandName","header","Brand Name ",3,"sortable"],["width","10%","field","amount","header","Amount ",3,"sortable","filterable"],["width","10%","field","sellingPrice","header","Selling Price ",3,"hasSummary","sortable","filterable"],["width","10%","field","type","header","Type ",3,"sortable","filterable"],["width","10%","dataType","boolean","field","expired","header","Expired ",3,"sortable","filterable"],["width","10%","dataType","boolean","field","available","header","Available ",3,"sortable","filterable"],["field","_id","header"," ",3,"filterable"],["igxCell",""],[1,"transaction_drug"],[1,"queue__form",3,"submit"],["form","ngForm"],["type","hidden","name","drug",3,"ngModel"],["required","","name","genericName","type","text",1,"drug_name",3,"ngModel"],["required","","class","drug_name","name","customer","customer","","placeholder","Customer","type","text","ngModel","",4,"ngIf"],["required","","name","quantity","quantity","","placeholder","0","type","number","ngModel","","min","1"],["mat-button","","color","warn",1,"cancle",3,"click"],["type","submit",1,"btn","btn--white","send_queue"],["required","","name","customer","customer","","placeholder","Customer","type","text","ngModel","",1,"drug_name"],[1,"btn","btn--crimson","send_trans",3,"click"],["tabindex","0"],["mat-stroked-button","",3,"click"]],template:function(t,e){1&t&&(s.Ob(0,"app-search-comp"),s.Lc(1,x,13,3,"div",0),s.Lc(2,O,2,0,"div",1),s.Tb(3,"h5"),s.Nc(4,"DRUGS"),s.Sb(),s.Tb(5,"h4",2),s.Nc(6,"PLEASE USE A LAPTOP TO VIEW THIS PAGE\u2714\u2714\ud83d\ude01"),s.Sb(),s.Tb(7,"igx-grid",3,4),s.Ob(9,"igx-column",5),s.Ob(10,"igx-column",6),s.Ob(11,"igx-column",7),s.Ob(12,"igx-column",8),s.Ob(13,"igx-column",9),s.Ob(14,"igx-column",10),s.Ob(15,"igx-column",11),s.Tb(16,"igx-column",12),s.Lc(17,w,3,0,"ng-template",13),s.Sb(),s.Sb(),s.Ob(18,"br")),2&t&&(s.Ab(1),s.mc("ngForOf",e.transactionQueue),s.Ab(1),s.mc("ngIf",e.transactionQueue.length>0),s.Ab(5),s.mc("primaryKey","_id")("paging",!0)("perPage",10)("allowFiltering",!0)("showToolbar",!0)("columnPinning",!0)("columnHiding",!0)("data",e.drugs)("autoGenerate",!1)("rowEditable",!1)("exportExcel",!0)("allowFiltering",!0),s.Ab(2),s.mc("sortable",!0),s.Ab(1),s.mc("sortable",!0),s.Ab(1),s.mc("sortable",!1)("filterable",!1),s.Ab(1),s.mc("hasSummary",!0)("sortable",!0)("filterable",!1),s.Ab(1),s.mc("sortable",!0)("filterable",!1),s.Ab(1),s.mc("sortable",!1)("filterable",!1),s.Ab(1),s.mc("sortable",!1)("filterable",!1),s.Ab(1),s.mc("filterable",!1))},directives:[S,r.m,r.n,i.c,i.b,i.a,f.t,f.m,f.n,f.b,f.l,f.o,f.r,f.p,y.a,y.b],styles:["h5[_ngcontent-%COMP%]{text-align:center;margin-top:3rem}.transaction_drug[_ngcontent-%COMP%]{text-align:center;margin:.7rem 2rem;border:1rem;padding:.6rem 0;border-radius:2px;color:#dc143c;background-color:#ccc}.cancle[_ngcontent-%COMP%]{float:right;margin:auto}input[_ngcontent-%COMP%]{height:1.7rem;width:5rem;margin:-2rem;border-style:none;padding:0;border-radius:1rem;text-align:center;position:relative}.design[_ngcontent-%COMP%]{height:1rem}.send_trans[_ngcontent-%COMP%]{width:15%;position:absolute;padding:1rem 0;text-align:center}.send_queue[_ngcontent-%COMP%]{float:right;margin:auto 1rem;padding:.4rem;width:10%}.drug_name[_ngcontent-%COMP%]{float:left;margin:auto 1rem}@media screen and (max-width:500px){.queue__form[_ngcontent-%COMP%], .send_trans[_ngcontent-%COMP%], .transaction_drug[_ngcontent-%COMP%], app-search-comp[_ngcontent-%COMP%]{visibility:hidden}}"]}),t})()}];let A=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[a.g.forChild(P)],a.g]}),t})();var M=n("rhD1");let N=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[r.c,M.a]]}),t})(),C=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[r.c,i.d,A,N,M.a],N]}),t})()}}]);