(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{Yj9t:function(e,t,r){"use strict";r.r(t),r.d(t,"AuthModule",(function(){return O}));var n=r("ofXK"),a=r("tyNb"),o=r("fXoL"),i=r("qXBG"),s=r("dNgK"),m=r("Wp6s"),d=r("3Pt+"),c=r("kmnG"),u=r("qFsG"),l=r("bTqV");function b(e,t){1&e&&(o.Tb(0,"mat-error"),o.Lc(1,"Please enter a valid Password"),o.Sb())}function p(e,t){1&e&&(o.Tb(0,"mat-error"),o.Lc(1,"Please enter a valid Password"),o.Sb())}let g=(()=>{class e{constructor(e,t,r,n){this.authService=e,this.route=t,this.router=r,this._snackBar=n,this.isLoading=!1}ngOnInit(){this.loadingSub=this.authService.getLoadingStatusListener().subscribe(e=>{console.log(this.isLoading),this.isLoading=e,this.isLoading&&this._snackBar.open("LoAdinG......"),this.isLoading||this._snackBar.dismiss()})}createPassword(e){e.invalid||(e.form.value.password==e.form.value.passwordConfirm?this.authService.createUserPassword(this.route.snapshot.params.token,e.form.value.password,e.form.value.passwordConfirm).subscribe(e=>{this.isLoading=!1}):alert("Password and Password Confirm must be equal"))}}return e.\u0275fac=function(t){return new(t||e)(o.Nb(i.a),o.Nb(a.a),o.Nb(a.c),o.Nb(s.a))},e.\u0275cmp=o.Hb({type:e,selectors:[["app-create-password"]],decls:15,vars:2,consts:[[1,"create_password_page"],[1,"card__create__password"],[1,"form_create_password",3,"submit"],["fForm","ngForm"],["appearance","outline",1,"input__create__password"],["matInput","","name","password","required","","placeholder","Password:","ngModel","","type","password"],["passwordInput","ngModel"],[4,"ngIf"],["matInput","","name","passwordConfirm","required","","placeholder","Password Confirrm:","ngModel","","type","password"],["passwordConfirmInput","ngModel"],["mat-stroked-button","","type","submit","color","primary",1,"btn__create__password"]],template:function(e,t){if(1&e){const e=o.Ub();o.Tb(0,"div",0),o.Tb(1,"mat-card",1),o.Tb(2,"form",2,3),o.Zb("submit",(function(){o.Bc(e);const r=o.zc(3);return t.createPassword(r)})),o.Tb(4,"mat-form-field",4),o.Ob(5,"input",5,6),o.Jc(7,b,2,0,"mat-error",7),o.Sb(),o.Tb(8,"mat-form-field",4),o.Ob(9,"input",8,9),o.Jc(11,p,2,0,"mat-error",7),o.Sb(),o.Tb(12,"button",10),o.Tb(13,"strong"),o.Lc(14,"CREATE PASSWORD"),o.Sb(),o.Sb(),o.Sb(),o.Sb(),o.Sb()}if(2&e){const e=o.zc(6),t=o.zc(10);o.Ab(7),o.mc("ngIf",!e),o.Ab(4),o.mc("ngIf",!t)}},directives:[m.a,d.t,d.m,d.n,c.c,u.a,d.b,d.r,d.l,d.o,n.m,l.b,c.b],styles:[".card__create__password[_ngcontent-%COMP%]{width:50%;top:10rem;left:25%;height:50%;box-shadow:1rem 2rem 3rem rgba(78,59,185,.6);border-radius:1rem;position:relative}.form_create_password[_ngcontent-%COMP%]{width:100%}.input__create__password[_ngcontent-%COMP%]{width:100%;position:relative}.btn__create__password[_ngcontent-%COMP%]{margin-top:-1rem;width:100%;height:4rem}@media screen and (max-width:455px){.card__create__password[_ngcontent-%COMP%]{width:80%;top:10rem;left:10%}}"]}),e})();var h=r("d3UM"),f=r("FKr1");let _=(()=>{class e{constructor(e,t){this.authService=e,this._snackBar=t,this.isLoading=!1}ngOnInit(){this.signupForm=new d.f({fullName:new d.d(null,[d.s.required,d.s.minLength(4)]),username:new d.d(null,[d.s.required,d.s.minLength(4)]),email:new d.d(null,[d.s.required,d.s.email]),phoneNumber:new d.d(null,[d.s.required,d.s.min(7),d.s.minLength(7)]),gender:new d.d(null,d.s.required),dateOfBirth:new d.d(null,d.s.required),role:new d.d(null,d.s.required)}),this.loadingSub=this.authService.getLoadingStatusListener().subscribe(e=>{this.isLoading=e,this.isLoading&&this._snackBar.open("LoAdinG......"),this.isLoading||this._snackBar.dismiss()})}submitForm(){"VALID"==this.signupForm.status?(this.signupForm.value.password=12345678,this.signupForm.value.confirmPassword=12345678,this.authService.createUser({confirmPassword:this.signupForm.value.confirmPassword,dateOfBirth:this.signupForm.value.dateOfBirth,email:this.signupForm.value.email,name:this.signupForm.value.fullName,gender:this.signupForm.value.gender,password:this.signupForm.value.password,phoneNumber:this.signupForm.value.phoneNumber,role:this.signupForm.value.role,username:this.signupForm.value.username})):alert("Invalid Form, Please fill all the fields")}}return e.\u0275fac=function(t){return new(t||e)(o.Nb(i.a),o.Nb(s.a))},e.\u0275cmp=o.Hb({type:e,selectors:[["app-create-user"]],decls:35,vars:1,consts:[[1,"createuser__page"],[1,"createuser_form",3,"formGroup","submit"],[1,"form_container"],["appearance","outline"],["matInput","","formControlName","fullName","placeholder","Full Name:","type","text"],["matInput","","formControlName","username","username","","placeholder","Username:","type","text"],["matInput","","formControlName","email","email","","placeholder","Email:","type","email"],["matInput","","formControlName","phoneNumber","phoneNumber","","placeholder","Phone Number:","type","number"],["appearance","fill"],["matInput","","formControlName","gender"],["value","male"],["value","female"],["matInput","","formControlName","dateOfBirth","dateOfBirth","","placeholder","dateOfBirth:","type","date"],["matInput","","formControlName","role"],["value","cachier"],["value","pharmacist"],["value","MD"],["type","submit",1,"btn","btn--crimson"]],template:function(e,t){1&e&&(o.Tb(0,"div",0),o.Tb(1,"form",1),o.Zb("submit",(function(){return t.submitForm()})),o.Tb(2,"div",2),o.Tb(3,"mat-form-field",3),o.Ob(4,"input",4),o.Sb(),o.Tb(5,"mat-form-field",3),o.Ob(6,"input",5),o.Sb(),o.Tb(7,"mat-form-field",3),o.Ob(8,"input",6),o.Sb(),o.Tb(9,"mat-form-field",3),o.Ob(10,"input",7),o.Sb(),o.Tb(11,"mat-form-field",8),o.Tb(12,"mat-label"),o.Lc(13,"Gender:"),o.Sb(),o.Tb(14,"mat-select",9),o.Tb(15,"mat-option",10),o.Lc(16,"Male"),o.Sb(),o.Tb(17,"mat-option",11),o.Lc(18,"Female"),o.Sb(),o.Sb(),o.Sb(),o.Tb(19,"mat-form-field",3),o.Tb(20,"mat-label"),o.Lc(21,"Date Of Birth:"),o.Sb(),o.Ob(22,"input",12),o.Sb(),o.Tb(23,"mat-form-field",8),o.Tb(24,"mat-label"),o.Lc(25,"Role:"),o.Sb(),o.Tb(26,"mat-select",13),o.Tb(27,"mat-option",14),o.Lc(28,"Cachier"),o.Sb(),o.Tb(29,"mat-option",15),o.Lc(30,"Pharmacist"),o.Sb(),o.Tb(31,"mat-option",16),o.Lc(32,"MD"),o.Sb(),o.Sb(),o.Sb(),o.Tb(33,"button",17),o.Lc(34," Create User "),o.Sb(),o.Sb(),o.Sb(),o.Sb()),2&e&&(o.Ab(1),o.mc("formGroup",t.signupForm))},directives:[d.t,d.m,d.g,c.c,u.a,d.b,d.l,d.e,d.c,d.p,c.f,h.a,f.f],styles:[".createuser__page[_ngcontent-%COMP%]{background-image:linear-gradient(98deg,hsla(0,0%,100%,.95),#fff 50%,rgba(220,20,60,.9) 0,transparent),url(createUser_back.1446bd269280f6484646.jpg);background-size:cover;height:100%;width:100%;z-index:0;position:fixed}.createuser_form[_ngcontent-%COMP%]{width:50%;height:100%}.form_container[_ngcontent-%COMP%]{margin:2rem 5%}mat-form-field[_ngcontent-%COMP%]{width:100%;height:2rem;padding:1rem 0;margin:0}input[_ngcontent-%COMP%]{height:1rem;padding-top:-10rem;padding-bottom:0}.lottie_animation[_ngcontent-%COMP%]{margin:5rem 5%;width:50%;height:100%;position:absolute;right:-2rem;top:0}@media only screen and (max-width:1000px){.createuser__page[_ngcontent-%COMP%]{background-image:linear-gradient(transparent),url(createUser_back.1446bd269280f6484646.jpg);background-size:cover;z-index:0;position:fixed}.createuser__page[_ngcontent-%COMP%], .createuser_form[_ngcontent-%COMP%]{height:100%;width:100%}.form_container[_ngcontent-%COMP%]{margin:5rem 5%}}"]}),e})();const w=[{path:"login",component:(()=>{class e{constructor(e,t){this.authService=e,this._snackBar=t,this.isLoading=!1}ngOnInit(){this.loadingSub=this.authService.getLoadingStatusListener().subscribe(e=>{this.isLoading=e,this.isLoading&&this._snackBar.open("LoAdinG......"),this.isLoading||this._snackBar.dismiss()})}onLogin(e){e.invalid||this.authService.login(e.value.username,e.value.password)}ngOnDestroy(){this.loadingSub.unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(o.Nb(i.a),o.Nb(s.a))},e.\u0275cmp=o.Hb({type:e,selectors:[["app-login"]],decls:15,vars:0,consts:[[1,"login"],[1,"login_form_card"],[1,"login_form"],[1,"login_form_head"],[1,"form",3,"submit"],["loginForm","ngForm"],["appearance","outline"],["matInput","","required","","name","username","username","","placeholder","Username:","ngModel","","type","text"],["usernameInput","ngModel"],["matInput","","required","","name","password","password","","placeholder","Password:","ngModel","","type","password"],["passwordInput","ngModel"],["id","login_btn","type","submit",1,"btn","btn--crimson"]],template:function(e,t){if(1&e){const e=o.Ub();o.Tb(0,"section",0),o.Tb(1,"section",1),o.Tb(2,"div",2),o.Tb(3,"h5",3),o.Lc(4,"LOGIN"),o.Sb(),o.Tb(5,"form",4,5),o.Zb("submit",(function(){o.Bc(e);const r=o.zc(6);return t.onLogin(r)})),o.Tb(7,"mat-form-field",6),o.Ob(8,"input",7,8),o.Sb(),o.Tb(10,"mat-form-field",6),o.Ob(11,"input",9,10),o.Sb(),o.Tb(13,"button",11),o.Lc(14," LOGIN "),o.Sb(),o.Sb(),o.Sb(),o.Sb(),o.Sb()}},directives:[d.t,d.m,d.n,c.c,u.a,d.b,d.r,d.l,d.o],styles:[".login[_ngcontent-%COMP%]{margin:0;height:100vh;background-image:linear-gradient(to left top,#fff,#dc143c)}.login_form_card[_ngcontent-%COMP%]{background-image:linear-gradient(105deg,hsla(0,0%,100%,.9),hsla(0,0%,100%,.9) 50%,rgba(220,20,60,.9) 0,rgba(173,255,47,.8) 70%,transparent),url(pharmacy_background.94c7e150a4834f151035.jpg);background-size:cover;right:15%;top:25%;border-radius:.3rem;box-shadow:0 1rem 3rem rgba(0,0,0,.1);height:25rem;width:70%;position:absolute}.login_form_head[_ngcontent-%COMP%]{font-family:Courier New,Courier,monospace;color:#000;position:relative;padding-top:2rem;margin-left:3rem;margin-bottom:3rem;font-size:2rem;font-weight:500}.login_form[_ngcontent-%COMP%]{width:50%;color:#000;border-radius:.3rem 0 0 .3rem;margin-top:-2rem;height:100%}.form[_ngcontent-%COMP%]{padding:0 3rem}mat-form-field[_ngcontent-%COMP%]{width:100%}@media only screen and (max-width:1000px){.login_form_card[_ngcontent-%COMP%]{background-image:linear-gradient(transparent),url(pharmacy_background.94c7e150a4834f151035.jpg);background-size:cover;right:10%;top:20%;border-radius:.3rem;box-shadow:0 1rem 3rem rgba(0,0,0,.1);height:25rem;width:80%;position:absolute}.login_form[_ngcontent-%COMP%]{width:100%;color:#000;border-radius:.3rem 0 0 .3rem;margin-top:-2rem;height:100%}}"]}),e})()},{path:"create-user",component:_},{path:"create-password/:token",component:g}];let v=(()=>{class e{}return e.\u0275mod=o.Lb({type:e}),e.\u0275inj=o.Kb({factory:function(t){return new(t||e)},imports:[[a.g.forChild(w)],a.g]}),e})();var S=r("rhD1"),L=r("4pnn");let O=(()=>{class e{}return e.\u0275mod=o.Lb({type:e}),e.\u0275inj=o.Kb({factory:function(t){return new(t||e)},providers:[L.b],imports:[[n.b,v,S.a]]}),e})()}}]);