import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type Email = Text;
  type Timestamp = Int;

  type WaitlistEntry = {
    email : Email;
    timestamp : Timestamp;
    position : Nat;
  };

  let waitlistEntries = Map.empty<Email, WaitlistEntry>();

  public shared ({ caller }) func submitEmail(email : Email) : async Nat {
    if (waitlistEntries.containsKey(email)) {
      Runtime.trap("Email is already on the waitlist.");
    };

    let position = waitlistEntries.size() + 1;
    let entry : WaitlistEntry = {
      email;
      timestamp = Time.now();
      position;
    };
    waitlistEntries.add(email, entry);
    position;
  };

  public query ({ caller }) func getUserPosition(email : Email) : async Nat {
    switch (waitlistEntries.get(email)) {
      case (null) { Runtime.trap("Email is not on the waitlist.") };
      case (?entry) { entry.position };
    };
  };

  public query ({ caller }) func getTotalWaitlistCount() : async Nat {
    waitlistEntries.size();
  };
};
