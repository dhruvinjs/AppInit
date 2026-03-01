declare module "appinit-templates/docs" {
  export type TemplateDocFile = {
    path: string;
    name: string;
    targetPath: string;
  };

  export type TemplateDocSection = {
    id: string;
    title: string;
    files: TemplateDocFile[];
  };

  export const templateDocsManifest: {
    languages: {
      typescript: TemplateDocSection[];
      javascript: TemplateDocSection[];
    };
  };

  export const templateDocsSources: Record<string, string>;
}
