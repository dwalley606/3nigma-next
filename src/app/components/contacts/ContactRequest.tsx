// components/contacts/ContactRequest.tsx
import { supabase } from "@/lib/supabase";

interface ContactRequestProps {
  requestId: string;
  fromUserId: string;
  onRequestUpdated: () => void;
}

const ContactRequest = ({ requestId, fromUserId, onRequestUpdated }: ContactRequestProps) => {
  const handleAcceptRequest = async () => {
    const { error } = await supabase
      .from("contact_requests")
      .update({ status: "accepted" })
      .eq("id", requestId);
    if (error) {
      console.error("Error accepting contact request:", error);
    } else {
      onRequestUpdated();
      alert("Contact request accepted!");
    }
  };

  const handleDeclineRequest = async () => {
    const { error } = await supabase
      .from("contact_requests")
      .update({ status: "rejected" })
      .eq("id", requestId);
    if (error) {
      console.error("Error declining contact request:", error);
    } else {
      onRequestUpdated();
      alert("Contact request declined.");
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <span>Request from {fromUserId}</span>
      <div>
        <button onClick={handleAcceptRequest} className="mr-2 text-blue-600">
          Accept
        </button>
        <button onClick={handleDeclineRequest} className="text-red-600">
          Decline
        </button>
      </div>
    </div>
  );
};

export default ContactRequest;
