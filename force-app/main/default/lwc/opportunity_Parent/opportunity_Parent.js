import { LightningElement, api, track } from 'lwc';
import getOpportunitymethodDetails from '@salesforce/apex/getOpportunityChildDetails.getOpportunitymethodDetails';

export default class Opportunity_Parent extends LightningElement {
    @api recordId;
    @track parentRecordId;
    opportunityCard = false;

    stage1 = false;
    stage2 = false;
    stage3 = false;
    stage4 = false;

    connectedCallback(){
        // Passing parent record ID
        this.parentRecordId = this.recordId;
        getOpportunitymethodDetails({UserId:this.recordId})
        .then(result=>{
            if(result == 'Asset Details'){
                this.stage1 = true;
                this.opportunityCard = true;
            }else if(result == 'Income Details'){
                this.stage2 = true;
                this.opportunityCard = true;
            }else if(result == 'Loan Application Details'){
                this.stage3 = true;
                this.opportunityCard = true;
            }else if(result == 'Final Terms'){
                this.stage4 = true;
                this.opportunityCard = true;
            }
        })
        .catch(error=>{
            alert(error);
        })
    }
}