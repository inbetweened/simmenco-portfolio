import { blockTypes } from "./blocks";
import { siteSettings } from "./siteSettings";
import { workItem } from "./workItem";

export const schemaTypes = [workItem, siteSettings, ...blockTypes];
