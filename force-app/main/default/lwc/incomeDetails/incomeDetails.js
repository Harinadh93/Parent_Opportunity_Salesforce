import { LightningElement, api } from 'lwc';
import INCOME_OBJECT from '@salesforce/schema/Income_Details__c';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Income_Details__c.Annual_Revenue__c';
import INCOME_DETAILS_NAME_FIELD from '@salesforce/schema/Income_Details__c.Name';
import INCOME_TAX_PAID_FIELD from '@salesforce/schema/Income_Details__c.Income_Tax_Paid__c';
import OPPORTUNITY_FIELD from '@salesforce/schema/Income_Details__c.Opportunity__c';
import getfinaltermDetails from '@salesforce/apex/getfinalterm.getfinaltermDetails';
import getIncomeDetailsValue from '@salesforce/apex/getfinalterm.getIncomeDetailsValue';

export default class IncomeDetails extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api incomeDetailId;
    @api recordId;
    @api objectApiName = INCOME_OBJECT;

    fields = [ANNUAL_REVENUE_FIELD, OPPORTUNITY_FIELD, INCOME_DETAILS_NAME_FIELD, INCOME_TAX_PAID_FIELD];

    connectedCallback(){
        getfinaltermDetails({UserId:this.incomeDetailId})
        .then(result1=>{
            getIncomeDetailsValue()
            .then(result2=>{
                for(let i=0;i<result2.length;i++){
                    if(result2[i].incomeOpp == result1){
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