import { LightningElement,api } from 'lwc';
import LOAN_APPLICATION_DETAILS_OBJECT from '@salesforce/schema/Loan_Application_Details__c';
import BRANCH_WHERE_LOAN_IS_REQUIRED_IF_ANY_FIELD from '@salesforce/schema/Loan_Application_Details__c.Branch_where_loan_is_required_If_any__c';
import CITY_WHERE_LOAN_IS_REQUIRED_FIELD from '@salesforce/schema/Loan_Application_Details__c.City_where_loan_is_required__c';
import DATE_OF_ESTABLISHMENT_BIRTH_FIELD from '@salesforce/schema/Loan_Application_Details__c.Date_of_Establishment_Birth__c';
import DISTRICT_FIELD from '@salesforce/schema/Loan_Application_Details__c.District__c';
import EMAIL_ADDRESS_FIELD from '@salesforce/schema/Loan_Application_Details__c.E_mail_Address__c';
import NAME_AND_THE_ENTERPRISE_INDIVIDUAL_FIELD from '@salesforce/schema/Loan_Application_Details__c.Name';
import OPPORTUNITY_FIELD from '@salesforce/schema/Loan_Application_Details__c.Opportunity__c';
import PAN_CARD_NO_FIELD from '@salesforce/schema/Loan_Application_Details__c.PAN_Card_No__c';
import REGISTERED_OFFICE_ADDRESS_FIELD from '@salesforce/schema/Loan_Application_Details__c.Registered_Office_Address__c';
import STATE_FIELD from '@salesforce/schema/Loan_Application_Details__c.State__c';
import TELEPHONE_FIELD from '@salesforce/schema/Loan_Application_Details__c.Telephone_No__c';
import WHETHER_BELONGS_TO_SC_ST_OBC_MINORITY_FIELD from '@salesforce/schema/Loan_Application_Details__c.Whether_Belongs_to_SC_ST_OBC_Minority_Co__c';
import getfinaltermDetails from '@salesforce/apex/getfinalterm.getfinaltermDetails';
import getloanDetailsValue from '@salesforce/apex/getfinalterm.getloanDetailsValue';

export default class LoanApplicationDetails extends LightningElement {
     // Flexipage provides recordId and objectApiName
     @api loanDetailId;
     @api recordId;
     @api objectApiName = LOAN_APPLICATION_DETAILS_OBJECT;
 
     fields = [OPPORTUNITY_FIELD, BRANCH_WHERE_LOAN_IS_REQUIRED_IF_ANY_FIELD, CITY_WHERE_LOAN_IS_REQUIRED_FIELD,
              DATE_OF_ESTABLISHMENT_BIRTH_FIELD, DISTRICT_FIELD, EMAIL_ADDRESS_FIELD, NAME_AND_THE_ENTERPRISE_INDIVIDUAL_FIELD,
              PAN_CARD_NO_FIELD, REGISTERED_OFFICE_ADDRESS_FIELD, STATE_FIELD, TELEPHONE_FIELD, WHETHER_BELONGS_TO_SC_ST_OBC_MINORITY_FIELD];
 
     connectedCallback(){
         getfinaltermDetails({UserId:this.loanDetailId})
         .then(result1=>{
             getloanDetailsValue()
             .then(result2=>{
                 for(let i=0;i<result2.length;i++){
                     if(result2[i].loanOpp == result1){
                         this.recordId = result2[i].Id;
                     }
                 }
             })
             .catch(error=>{
                 console.log(error);
             })
         })
         .catch(error=>{
             console.log(error);
         })
     }
}