public with sharing class getOpportunityChildDetails {
    @AuraEnabled
    public static string getOpportunitymethodDetails(String UserId){
        try {
            opportunity Opp = [select Id,StageName from opportunity where Id=:UserId];
            String UserIdValue = Opp.StageName;
            return UserIdValue;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
