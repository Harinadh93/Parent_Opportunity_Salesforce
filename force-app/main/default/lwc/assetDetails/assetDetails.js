import { LightningElement, api } from 'lwc';
import ASSERTOBJECT from '@salesforce/schema/Asset_Details__c';
import NAME_FIELD from '@salesforce/schema/Asset_Details__c.Name';
import OPPORTUNITY_FIELD from '@salesforce/schema/Asset_Details__c.Opportunity__c';
import ASSET_NAME_FIELD from '@salesforce/schema/Asset_Details__c.Asset_Name__c';
import ASSET_OWNER_FIELD from '@salesforce/schema/Asset_Details__c.Asset_Owner__c';
import ASSET_PROVIDED_BY_FIELD from '@salesforce/schema/Asset_Details__c.Asset_Provided_by__c';
import ASSET_SERVICED_BY_FIELD from '@salesforce/schema/Asset_Details__c.Asset_Serviced_by__c';
import COMPETITOR_ASSET_FIELD from '@salesforce/schema/Asset_Details__c.Competitor_Asset__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Asset_Details__c.Description__c';
import INSTALL_DATE_FIELD from '@salesforce/schema/Asset_Details__c.Install_Date__c';
import INTERNAL_ASSET_FIELD from '@salesforce/schema/Asset_Details__c.Internal_Asset__c';
import PRICE_FIELD from '@salesforce/schema/Asset_Details__c.Price__c';
import PRODUCT_FIELD from '@salesforce/schema/Asset_Details__c.Product__c';
import PRODUCT_CODE_FIELD from '@salesforce/schema/Asset_Details__c.Product_Code__c';
import PRODUCT_DESCRIPTION_FIELD from '@salesforce/schema/Asset_Details__c.Product_Description__c';
import QUANTITY_FIELD from '@salesforce/schema/Asset_Details__c.Quantity__c';
import getfinaltermDetails from '@salesforce/apex/getfinalterm.getfinaltermDetails';
import getAssertDetailsValue from '@salesforce/apex/getfinalterm.getAssertDetailsValue';

export default class AssetDetails extends LightningElement {
     // Expose a field to make it available in the template
     nameField = NAME_FIELD;
     opportunityField = OPPORTUNITY_FIELD;
 
     // Flexipage provides recordId and objectApiName
     @api assertDetailId;
     @api recordId;
     @api objectApiName = ASSERTOBJECT;
 
     fields = [NAME_FIELD, OPPORTUNITY_FIELD, ASSET_NAME_FIELD, ASSET_OWNER_FIELD, ASSET_PROVIDED_BY_FIELD, 
               ASSET_SERVICED_BY_FIELD, COMPETITOR_ASSET_FIELD, DESCRIPTION_FIELD, INSTALL_DATE_FIELD,
               INTERNAL_ASSET_FIELD, PRICE_FIELD, PRODUCT_FIELD, PRODUCT_CODE_FIELD, PRODUCT_DESCRIPTION_FIELD,
               QUANTITY_FIELD];
 
     connectedCallback(){
         getfinaltermDetails({UserId:this.assertDetailId})
         .then(result1=>{
             getAssertDetailsValue()
             .then(result2=>{
                 for(let i=0;i<result2.length;i++){
                     if(result2[i].assertOpp == result1){
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