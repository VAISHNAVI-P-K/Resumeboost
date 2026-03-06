/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: resumetemplates
 * Interface for ResumeTemplates
 */
export interface ResumeTemplates {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  templateName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  previewImage?: string;
  /** @wixFieldType url */
  downloadPdfUrl?: string;
  /** @wixFieldType url */
  downloadDocxUrl?: string;
}
