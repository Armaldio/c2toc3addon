"use strict";

{
	const PLUGIN_CLASS = SDK.Plugins.armaldio_project_translate;
	
	PLUGIN_CLASS.Instance = class armaldio_project_translateInstance extends SDK.IInstanceBase
	{
		constructor(sdkType, inst)
		{
			super(sdkType, inst);
		}
		
		Release()
		{
		}
		
		OnCreate()
		{
		}
		
		OnPropertyChanged(id, value)
		{
		}
		
		LoadC2Property(name, valueString)
		{
			return false;		// not handled
		}
	};
}