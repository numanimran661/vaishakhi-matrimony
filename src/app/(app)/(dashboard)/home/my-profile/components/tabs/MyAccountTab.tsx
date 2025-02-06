import Button from "@/app/components/common/buttons/Button";
import InputField from "@/app/components/common/inputFields/InputField";
import ImageUploader from "@/app/components/common/inputFields/ImageUploader";

interface ProfileFormData {
  [key: string]: string;
}

interface ProfilePanelProps {
  formData: ProfileFormData;
  images: string[];
  handleChange: (name: string, value: string) => void;
  handleImageUpload: (images: FileList | null) => void;
  handleDeleteImage: (index: number) => void;
}

const MyAccountTab = ({
  formData,
  images,
  handleChange,
  handleImageUpload,
  handleDeleteImage,
}: ProfilePanelProps) => {
  // const [uploadedImages, setUploadedImages] = useState<string[]>(images ?? []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Profile Images</h3>
      <ImageUploader onUpload={handleImageUpload} maxImages={8} className="w-72" />
      <div className="flex gap-2 mt-4 mb-12">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Profile ${index}`}
              className="w-24 h-16 object-contain rounded-md"
            />
            <div
              className="absolute top-0 right-0 bg-primary flex items-center justify-center text-white text-xs w-3 h-3 rounded-sm cursor-pointer"
              onClick={() => handleDeleteImage(index)}
            >
              ×
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-6">Account Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Profile ID"
          name="profileId"
          value={formData.profileId}
          disabled
        />
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
        <InputField
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </div>

      <Button label="Save Changes" className="mt-5" />

      <h3 className="text-lg font-semibold mt-6 text-darkBlue">
        Account Deactivation
      </h3>
      <Button label="Delete Account" variant="secondary" className="mt-2 border border-red-500 text-red-500" />
    </div>
  );
};

export default MyAccountTab;
