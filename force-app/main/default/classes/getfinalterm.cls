public with sharing class getfinalterm {
    @AuraEnabled
    public static string getfinaltermDetails(String UserId){
        try {
            opportunity Opp = [select Id,Name from opportunity where Id=:UserId];
            String UserIdValue = Opp.Name;
            return UserIdValue;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<finalTermsValue> getFinalTermsValue(){
        try {
            List<finalTermsValue> finStr = new List<finalTermsValue>();
            List<Final_Terms__c> fin = [select Id,Opportunity__r.Name from Final_Terms__c];
            for(Final_Terms__c finVal:fin){
                finalTermsValue obj = new finalTermsValue();
                obj.finalTerms = finVal.Opportunity__r.Name;
                obj.Id = finVal.Id;
                finStr.add(obj);
            }
            return finStr;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class finalTermsValue{
        @AuraEnabled
        public string finalTerms;
        @AuraEnabled
        public string Id;
    }

    @AuraEnabled
    public static List<assertTermsValue> getAssertDetailsValue(){
        try {
            List<assertTermsValue> assStr = new List<assertTermsValue>();
            List<Asset_Details__c> ass = [select Id,Opportunity__r.Name from Asset_Details__c];
            for(Asset_Details__c assVal:ass){
                assertTermsValue obj = new assertTermsValue();
                obj.assertOpp = assVal.Opportunity__r.Name;
                obj.Id = assVal.Id;
                assStr.add(obj);
            }
            return assStr;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class assertTermsValue{
        @AuraEnabled
        public string assertOpp;
        @AuraEnabled
        public string Id;
    }

    @AuraEnabled
    public static List<incomeDetailsValue> getIncomeDetailsValue(){
        try {
            List<incomeDetailsValue> incStr = new List<incomeDetailsValue>();
            List<Income_Details__c> inc = [select Id,Opportunity__r.Name from Income_Details__c];
            for(Income_Details__c incVal:inc){
                incomeDetailsValue obj = new incomeDetailsValue();
                obj.incomeOpp = incVal.Opportunity__r.Name;
                obj.Id = incVal.Id;
                incStr.add(obj);
            }
            return incStr;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class incomeDetailsValue{
        @AuraEnabled
        public string incomeOpp;
        @AuraEnabled
        public string Id;
    }

    @AuraEnabled
    public static List<loanDetailsValue> getloanDetailsValue(){
        try {
            List<loanDetailsValue> lonStr = new List<loanDetailsValue>();
            List<Loan_Application_Details__c> inc = [select Id,Opportunity__r.Name from Loan_Application_Details__c];
            for(Loan_Application_Details__c lonVal:inc){
                loanDetailsValue obj = new loanDetailsValue();
                obj.loanOpp = lonVal.Opportunity__r.Name;
                obj.Id = lonVal.Id;
                lonStr.add(obj);
            }
            return lonStr;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class loanDetailsValue{
        @AuraEnabled
        public string loanOpp;
        @AuraEnabled
        public string Id;
    }
}
