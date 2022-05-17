import { LightningElement, api } from 'lwc';
import FINAL_TERMS_OBJECT from '@salesforce/schema/Final_Terms__c';
import GUARANTOR_FIELD from '@salesforce/schema/Final_Terms__c.Guarantor__c';
import ISSUER_FIELD from '@salesforce/schema/Final_Terms__c.Name';
import OPPORTUNITY_FIELD from '@salesforce/schema/Final_Terms__c.Opportunity__c';
import SERIAL_NUMBER_FIELD from '@salesforce/schema/Final_Terms__c.Serial_Number__c';
import SPECIFY_CURRENCY_OR_CURRENCIES from '@salesforce/schema/Final_Terms__c.Specified_Currency_or_Currencies__c';
import TRANCHE_NUMBER_FIELD from '@salesforce/schema/Final_Terms__c.Tranche_Number__c';
import getfinaltermDetails from '@salesforce/apex/getfinalterm.getfinaltermDetails';
import getFinalTermsValue from '@salesforce/apex/getfinalterm.getFinalTermsValue';

export default class FinalTerms extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api finalTermId;
    @api recordId;
    @api objectApiName = FINAL_TERMS_OBJECT;

    fields = [GUARANTOR_FIELD, OPPORTUNITY_FIELD, ISSUER_FIELD, SERIAL_NUMBER_FIELD, 
             SPECIFY_CURRENCY_OR_CURRENCIES, TRANCHE_NUMBER_FIELD];

    connectedCallback(){
        getfinaltermDetails({UserId:this.finalTermId})
        .then(result1=>{
            getFinalTermsValue()
            .then(result2=>{
                for(let i=0;i<result2.length;i++){
                    if(result2[i].finalTerms == result1){
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