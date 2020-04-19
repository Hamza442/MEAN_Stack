import { Component, OnInit } from '@angular/core';
//imported to use form group and control classes
//calling form builder class to make formfroupmodel using this class
//FormBuilder is used as a service so we have to inject it using the constructor 
//Validators called to use validations
import{FormControl,FormGroup,FormBuilder,Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  //this is our form group model vedio 3 for reference

  //<form> element is binded to this formGroup instance
  employeeForm:FormGroup;
  //to keep track number of charaters for full name
  fullNameLength=0;
  
  //object for validation messages
  validationMessages={
    'fullName':{
      'required':'Full Name is required.',
      'minlength':'Full Name must be gretaer than 2 charatcers.',
      'maxlength':'Full Name must be less than 10 characters.'
    },
    'email':{
      'required':'Email is required.'
    },
    'confirmEmail':{
      'required':'Confirm Email is required.'
    },
    'emailGroup':{
      'emailMismatch': 'Email and Confirm Email dont match ',
    },
    'phone':{
      'required':'Phone Number is required.'
    },
    'skillName':{
      'required':'Skill Name is required.',
    },
    'experinceInYears':{
      'required':'Experince is required.',
    },
    'proficiency':{
      'required':'Proficiency is required.',
    }
  };
  //this object will store the validation messages for those who have failed validation
  //this object will be used in UI
  formErrors={
    'fullName':'',
    'email':'',
    'confirmEmail':'',
    'emailGroup':'',
    'phone':'',
    'skillName':'',
    ' experinceInYears':'',
    'proficiency':''
  };

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    //using form builder class
    this.employeeForm=this.fb.group({
      //first value for array is default value
      //2nd value for array we can specify the validators
      fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      contactPreference:['email'],
      //we are making this nested form group so that we are able to pass both the controls to validator function
      //angular validator function accepts only single parameter either a group or control
      //we want to check the both so pass them as single parameter
      emailGroup:this.fb.group({
        email:['',Validators.required],
      confirmEmail:['',Validators.required]
      },{validators:matchEmail}),//here we are binding the form group so that we are able to pass the value of formgroup to the function
      //we are not adding validator because this optional
      phone:[''],
      skills:this.fb.group({
        skillName:['',Validators.required],
        experinceInYears:['',Validators.required],
        proficiency:['',Validators.required]
      })
    });
    
    //here we are going to check the values changes in formcontrol
    //we are subscribing to the valueChanges because it is observable
    this.employeeForm.get('fullName').valueChanges.subscribe((value:string)=>{
      this.fullNameLength=value.length;
    });

    //we are added here so that we notified everytime the value changes
    //and that data will be passed to our function so that it can check it for validation
    //sending form data to the function
    this.employeeForm.valueChanges.subscribe((data)=>{
      this.logValidationErrors(this.employeeForm);
    });
    //we are doing this so that we are notified when ever the value of changes
    //also so that we dont have to find to the click event of html
    this.employeeForm.get('contactPreference').valueChanges.subscribe((data:string)=>{
      //we are calling the method and passing the changed data
      this.onContactPreferenceChange(data);
    });
    /*       Without Form Builder Class
    //this is our root form group
    this.employeeForm=new FormGroup({
      // these to are the form controls
      fullName:new FormControl(),
      email:new FormControl(),
      //this is our nested form group
      //the key skills will be used ti bind with the form
      skills: new FormGroup({
        //form controls for this form group
        skillName:new FormControl(),
        experinceInYears:new FormControl(),
        proficiency:new FormControl()
      })
    });
    */
  }
  //this method is used to use the validation on the preferred contact
  onContactPreferenceChange(selectedValue:string){
    //set and clear validators not triggers validation
    const phoneControl = this.employeeForm.get('phone');
    if(selectedValue ==='phone'){
      phoneControl.setValidators(Validators.required);
    }
    else{
      phoneControl.clearValidators();
    }
    //to trigger validtions we have to use this functions
    phoneControl.updateValueAndValidity();
  }
  //this method will be used to loop through each key for validation
  logValidationErrors(group:FormGroup=this.employeeForm):void{
    Object.keys(group.value).forEach((Key:string)=>{
      //abstract control can be formcontrol or nested formgroup because we dont know what value is coming
      const abstractControl=group.get(Key)

       //here we are clearing the existing validation errors if dont do so it will store multi values
       this.formErrors[Key]=' ';
       //here we are checking the formcontrol that we are receving is valid or not
       if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
         //here we are retreving the validation messages from the object
         //with the help of the key that we are iterating we will get all the messages
         const messages=this.validationMessages[Key];
         //now using loop we are going to store the error messages to respective keys
         //these keys are in our formserror object
         //group.get(key) by this method we are getting them and storing in keys
         for(const errorKey in abstractControl.errors){
           //if there is error then store it
           if(errorKey){
             //here we are storing the error messages into the respective keys
             //the space in end is for fullName beacuse it has more then 1 error messages and they must be separated by space
             this.formErrors[Key]+= messages[errorKey]+' ';
           }
         }
       }
      //now here we will check if it is nested formgroup 
      //if it is then we will recursively loop through it
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      }
    });
  }

  /*logKeyValuePairs(group:FormGroup):void{
    //looping through each form control
    //we are retreiving all the keys from the formgroup
    //and using forloop key we are looping through each key
    Object.keys(group.controls).forEach((key:string)=>{
      //abstract control can be formcontrol or nested formgroup because we dont know what value is coming
      const abstractControl=group.get(key)
      //now here we will check if it is nested formgroup 
      //if it is then we will recursively loop through it
      if(abstractControl instanceof FormGroup){
        this.logKeyValuePairs(abstractControl);
      }else{
        abstractControl.disable();
        console.log('key ='+key+'Value ='+abstractControl.value);
        
      }
    });
  }*/

  onLoadDataClick():void{
    //we are using the formcontrol because on click we want to load formcontrl values
    this.logValidationErrors(this.employeeForm);
  }

  onSubmit():void{
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.touched);

    //to check or get value of formcontrol
    console.log(this.employeeForm.controls.fullName.touched);
    //we can also use this same synatax like {{employeeForm.get('fullName').value}} to get value on our page
    console.log(this.employeeForm.get('fullName').value);
  }

}
//this function will check the values of both the controls
  //we are going to pass the nested formgroup to this function
  //this function returns a key value pair
  //if no validtion error this going to return null
  function matchEmail(group:AbstractControl):{[key:string]:any} | null {
    //this is going to return reference for email form control
    const emailControl=group.get('email');
    const confirmEmailControl=group.get('confirmEmail');
    //here checking if both have same value
    //pristine means user dont have the opportuinity to type in the confirm email form control
    if(emailControl.value===confirmEmailControl.value || confirmEmailControl.pristine){
      //this indicates there are no validation errors
      return null;
    }
    else{
      //returning an object of key value pair to indicate a error
      //this key will be returned to the emailFormGroup and not to any control 
      //so in the validation messages structure it will look for the name of email group
      //becuae it is going to bind with that 
      return {"emailMismatch":true};
    }
    
  }
