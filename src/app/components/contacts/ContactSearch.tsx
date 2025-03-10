// components/contacts/ContactSearch.tsx

interface ContactSearchProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const ContactSearch = ({ searchTerm, onSearchChange }: ContactSearchProps) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search contacts"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
};

export default ContactSearch;
